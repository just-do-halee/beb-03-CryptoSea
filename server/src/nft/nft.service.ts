import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnvService } from 'src/env/env.service';
import { Repository } from 'typeorm';
import { Metadata } from './entities/metadata.entity';
import { MetaAttribute } from './entities/metaattribute.entity';
import {
  CacheNFTInput,
  GetNFTsInput,
  NFTOutput,
  NFTsOutput,
} from './dtos/nft.dto';
import { CONFIG_OPTIONS, IPFS_HOST_URLS } from './nft.constants';
import { AsyncTryCatch } from 'src/common/decorators/trycatch.decorator';
import { BaseResult, Result } from 'src/common/types/result.type';
import { Err, Ok, unwrap } from 'src/common/functions/result.function';
import { setAsyncInterval } from 'src/common/functions/core.function';
import { CID } from 'multiformats/cid';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { validateOrReject } from 'class-validator';
import * as AWS from 'aws-sdk';
import { Web3Service } from 'src/web3/web3.service';
import { NFTModuleOptions } from './nft.interface';
import {
  attachExt,
  amazonS3URL,
  extToMimeType,
} from 'src/common/functions/file.function';
import { Readable } from 'typeorm/platform/PlatformTools';

@Injectable()
export class NFTService {
  private readonly BUCKET_NAME: string;
  private readonly cryptosea: any;
  constructor(
    private readonly env: EnvService,
    private readonly httpService: HttpService,
    private readonly web3Service: Web3Service,
    @InjectRepository(Metadata)
    private readonly metadataRepo: Repository<Metadata>,
    @Inject(CONFIG_OPTIONS)
    private readonly options: NFTModuleOptions,
  ) {
    AWS.config.update({
      credentials: {
        accessKeyId: this.env.get('AWS_ACCESS_KEY_'),
        secretAccessKey: this.env.get('AWS_SECRET_ACCESS_KEY_'),
      },
    });
    this.BUCKET_NAME = this.env.get('AWS_BUCKET_NAME_');
    this.cryptosea = this.web3Service.cryptosea;
  }

  private metadataToS3URL({ cid, cext }: Metadata): string {
    return amazonS3URL(this.BUCKET_NAME, attachExt(cid, cext));
  }

  private async getConfirmation(targetBlockNumber: number): Promise<number> {
    const latestBlockNumber = await this.cryptosea.getLatestBlockNumber();
    if (typeof latestBlockNumber !== 'number')
      throw new Error(`web3 error: can not get latest block number`);

    return latestBlockNumber - targetBlockNumber;
  }

  @AsyncTryCatch()
  private async waitConfirm(
    blockNumber: number,
    ms: number = 15000,
    maxCount: number = 4,
  ): Promise<BaseResult> {
    const { confirmation } = this.options;
    if ((await this.getConfirmation(blockNumber)) >= confirmation) {
      return Ok(true);
    }

    return setAsyncInterval<BaseResult>(
      () => {
        return Ok(true);
      },
      {
        ms,
        maxCount,
        condition: async () =>
          (await this.getConfirmation(blockNumber)) >= confirmation,
        errorMessage: () =>
          `You need to wait until the nodes confirm your transaction more than ${confirmation}`,
      },
    );
  }

  @AsyncTryCatch()
  private async fetchFromIPFS<T>(
    cid: CID,
    options: AxiosRequestConfig<T> = {
      timeout: 250000, // 2.5 min
    },
  ): Promise<Result<T, string>> {
    const cidStr = cid.toString();

    let errors: Error[] = [];
    for (const rootUrl of IPFS_HOST_URLS) {
      const _url = rootUrl + '/ipfs/' + cidStr;

      let data;
      try {
        await this.httpService.get(_url, options).forEach((res) => {
          data = res.data; // ---
        });
      } catch (e) {
        errors.push(e);
        continue;
      }

      if (data) {
        return Ok(data);
      }
    }
    if (errors.length > 0) return Err(JSON.stringify(errors));
    return Err(`file not found cid from ipfs nodes`);
  }

  @AsyncTryCatch()
  async getNFTs(getNFTInput: GetNFTsInput): Promise<NFTsOutput> {
    const nfts = await this.metadataRepo.find({
      where: { ...getNFTInput },
      relations: ['attributes'],
    });

    if (!nfts || nfts.length === 0) return Err(`nft not found`);

    const nftsOutput = [];
    for (const metadata of nfts) {
      const url = this.metadataToS3URL(metadata);
      const nftOutput = {
        ...metadata,
        url,
      };
      nftsOutput.push(nftOutput);
    }

    return Ok(nftsOutput);
  }

  @AsyncTryCatch(`couldn't get token id : `)
  async getTokenId(txhash: string): Promise<Result<number, string>> {
    const txInfo = await this.cryptosea.getTransactionReceipt(txhash);
    if (typeof txInfo !== 'object') return Err(`invalid transaction hash`);
    const tokenId = this.cryptosea.utils.hexToNumber(txInfo.logs[0].topics[3]);
    return Ok(tokenId);
  }

  @AsyncTryCatch()
  async cacheNFT({ txhash }: CacheNFTInput): Promise<NFTOutput> {
    // check if there is it in our db
    const nft = await this.metadataRepo.findOne({ where: { txhash } });
    if (nft) {
      return Ok({
        tid: nft.tid,
        name: nft.name,
        description: nft.description,
        attributes: nft.attributes,
        url: this.metadataToS3URL(nft),
      });
    }

    const txInfo = await this.cryptosea.getTransaction(txhash);

    if (typeof txInfo !== 'object') return Err(`invalid transaction hash`);
    // console.log(txInfo);

    const { blockNumber, to, input } = txInfo;
    if (
      typeof blockNumber !== 'number' ||
      typeof to !== 'string' ||
      typeof input !== 'object'
    ) {
      return Err(`invalid transaction hash`);
    }

    let fileCid: CID;
    try {
      fileCid = CID.parse(input.tokenURI);
    } catch (e) {
      return Err(`invalid tokenURI in the transaction: ${input.tokenURI}`);
    }

    // waiting confirmation
    await this.waitConfirm(blockNumber);

    // fetch metadata
    const ok_metadataObj = unwrap(await this.fetchFromIPFS(fileCid));
    if (typeof ok_metadataObj !== 'object')
      return Err(`file is not metadata structure json style`);

    const tid = unwrap(await this.getTokenId(txhash)); // token id

    const metadataObj = {
      ...ok_metadataObj,
      tid,
      txhash,
    } as Metadata;

    const metadata = this.metadataRepo.create(metadataObj);

    await validateOrReject(metadata);

    // check if there is a same cid file in S3
    const exists = await this.metadataRepo.findOne({
      where: {
        cid: metadata.cid,
      },
    });
    let fileS3URL;
    if (!exists) {
      // if not
      // fetch file (image or video... etc)
      const ok_file = unwrap(
        await this.fetchFromIPFS<Readable>(CID.parse(metadata.cid), {
          timeout: 300000,
          responseType: 'stream',
        }),
      );
      if (ok_file === undefined)
        return Err(`file not found cid from ipfs nodes`);

      // upload to S3
      fileS3URL = await this.uploadFileToS3(
        attachExt(metadata.cid, metadata.cext),
        ok_file,
      );
    } else {
      fileS3URL = this.metadataToS3URL(exists);
    }

    // upload to RDBMS
    await this.metadataRepo.save(metadata);

    return Ok({
      tid: metadata.tid,
      name: metadata.name,
      description: metadata.description,
      attributes: metadata.attributes,
      url: fileS3URL,
    });
  }

  @AsyncTryCatch()
  private async uploadFileToS3(name: string, reader: Readable) {
    const { BUCKET_NAME } = this; // Upload File to S3

    await new AWS.S3()
      .upload({
        Bucket: BUCKET_NAME,
        Body: reader,
        ContentType: extToMimeType(name),
        Key: name,
        ACL: 'public-read',
      })
      .promise();

    return amazonS3URL(BUCKET_NAME, name);
  }
}
