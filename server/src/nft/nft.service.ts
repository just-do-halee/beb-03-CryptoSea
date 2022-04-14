import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnvService } from 'src/env/env.service';
import { Repository } from 'typeorm';
import { Metadata } from './entities/metadata.entity';
import { CacheNFTInput, NFTInput, NFTOutput, NFTsOutput } from './dtos/nft.dto';
import { CONFIG_OPTIONS, IPFS_HOST_URLS } from './nft.constants';
import { AsyncTryCatch } from 'src/common/decorators/trycatch.decorator';
import { Result } from 'src/common/types/result.type';
import { Err, Ok, unwrap } from 'src/common/functions/result.function';
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
import { Blob } from 'buffer';
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
      if (errors.length > 0) return Err(JSON.stringify(errors));
      return Err(`file not found cid from ipfs nodes`);
    }
  }

  @AsyncTryCatch()
  async getNFTs(nftInput: NFTInput): Promise<NFTsOutput> {
    const nfts = await this.metadataRepo.find({
      where: nftInput,
    });
    if (!nfts || nfts.length === 0) return Err(`nft not found`);

    const nftsOutput = [];
    for (const metadata of nfts) {
      const url = this.metadataToS3URL(metadata);
      const { name, description, attributes } = metadata;
      const nftOutput = {
        name,
        description,
        attributes,
        url,
      };
      nftsOutput.push(nftOutput);
    }

    return Ok(nftsOutput);
  }

  @AsyncTryCatch()
  async cacheNFT({ txhash }: CacheNFTInput): Promise<NFTOutput> {
    // const txhash =
    //   '584cbe4e19904b6aa1b87befb6da2dfce77554956c2249674f06020646af9d13'; // from client
    // const txhash =
    //   '0x7fb9f5865dc1c10a4d90cac2aa553bdae7b10ef17daa004a88698743cc406f69'; // invalid txhash

    // check if there is it in our db
    const nft = await this.metadataRepo.findOne({ where: { txhash } });
    if (nft) {
      return Ok({
        name: nft.name,
        description: nft.description,
        attributes: nft.attributes,
        url: this.metadataToS3URL(nft),
      });
    }

    const txInfo = await this.cryptosea.getTransaction(txhash);
    if (typeof txInfo !== 'object') return Err(`invalid transaction hash`);

    const { blockNumber, to, input } = txInfo;
    if (
      typeof blockNumber !== 'number' ||
      typeof to !== 'string' ||
      typeof input !== 'object'
    )
      return Err(`invalid transaction hash`);

    const latestBlockNumber = await this.cryptosea.getLatestBlockNumber();
    if (typeof latestBlockNumber !== 'number')
      return Err(`web3 error: can not get latest block number`);

    const confirmation = latestBlockNumber - blockNumber;

    if (confirmation < this.options.confirmation)
      return Err(
        `You need to wait until the node confirms your transaction more than 7. currently ${confirmation}.`,
      );

    let fileCid: CID;
    try {
      fileCid = CID.parse(input.tokenURI);
    } catch (e) {
      return Err(`invalid tokenURI in the transaction: ${input.tokenURI}`);
    }

    // fetch metadata
    const ok_metadataObj = unwrap(await this.fetchFromIPFS(fileCid));
    if (typeof ok_metadataObj !== 'object')
      return Err(`file is not metadata structure json style`);

    const metadataObj = {
      ...ok_metadataObj,
      txhash,
    } as Metadata;

    const metadata = this.metadataRepo.create(metadataObj);

    await validateOrReject(metadata);

    // fetch file (image or video... etc)
    const ok_file = unwrap(
      await this.fetchFromIPFS<Readable>(CID.parse(metadata.cid), {
        timeout: 50000,
        responseType: 'stream',
      }),
    );
    if (ok_file === undefined) return Err(`file not found cid from ipfs nodes`);

    // upload to S3
    const fileS3URL = await this.uploadFileToS3(
      attachExt(metadata.cid, metadata.cext),
      ok_file,
    );
    console.log('upload complete');
    // upload to RDBMS
    await this.metadataRepo.save(metadata);
    console.log('db complete');

    return Ok({
      name: metadata.name,
      description: metadata.description,
      attributes: metadata.attributes,
      url: fileS3URL,
    });
  }

  @AsyncTryCatch()
  private async uploadFileToS3(name: string, reader: Readable) {
    const { BUCKET_NAME } = this; // Upload File to S3
    console.log(reader);
    await new AWS.S3()
      .putObject({
        Bucket: BUCKET_NAME,
        Body: reader.read(),
        ContentType: extToMimeType(name),
        Key: name,
        ACL: 'public-read',
      })
      .promise();

    return amazonS3URL(BUCKET_NAME, name);
  }
}
