import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnvService } from 'src/env/env.service';
import { Like, Repository } from 'typeorm';
import { Metadata } from './entities/metadata.entity';
import {
  CacheNFTInput,
  GetNFTsInput,
  NFTOutput,
  NFTsOutput,
  SearchNFTsInput,
} from './dtos/nft.dto';
import { CONFIG_OPTIONS } from './nft.constants';
import { AsyncTryCatch } from 'src/common/decorators/trycatch.decorator';
import { BaseResult } from 'src/common/types/result.type';
import { Err, Ok, unwrap } from 'src/common/functions/result.function';
import { setAsyncInterval } from 'src/common/functions/core.function';
import { CID } from 'multiformats/cid';
import { validateOrReject } from 'class-validator';
import { NFTModuleOptions } from './nft.interface';
import {
  attachExt,
  amazonS3URL,
} from 'src/common/functions/file.function';
import { Readable } from 'typeorm/platform/PlatformTools';
import { Web3Service } from 'src/web3/web3.service';
import { MfsService } from 'src/mfs/mfs.service';

@Injectable()
export class NFTService {
  constructor(
    private readonly env: EnvService,
    private readonly mfs: MfsService,
    private readonly web3: Web3Service,
    @InjectRepository(Metadata)
    private readonly metadataRepo: Repository<Metadata>,
    @Inject(CONFIG_OPTIONS)
    private readonly options: NFTModuleOptions,
  ) {}

  private metadataToS3URL({ cid, cext }: Metadata): string {
    return amazonS3URL(this.mfs.BUCKET_NAME, attachExt(cid, cext));
  }

  @AsyncTryCatch()
  private async waitConfirm(
    blockNumber: number,
    ms: number = 15000,
    maxCount: number = 4,
  ): Promise<BaseResult> {
    const { confirmation } = this.options;
    if ((await this.web3.getConfirmation(blockNumber)) >= confirmation) {
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
          (await this.web3.getConfirmation(blockNumber)) >= confirmation,
        errorMessage: () =>
          `You need to wait until the nodes confirm your transaction more than ${confirmation}`,
      },
    );
  }

  @AsyncTryCatch()
  async searchNFTs({ keyword }: SearchNFTsInput): Promise<NFTsOutput> {
    const likeKeyword = Like(`%${keyword}%`);

    const nfts = await this.metadataRepo.find({
      where: [
        {
          name: likeKeyword,
        },
        {
          description: likeKeyword,
        },
        {
          attributes: [
            {
              atype: likeKeyword,
            },
          ],
        },
        {
          attributes: [
            {
              akey: likeKeyword,
            },
          ],
        },
        {
          attributes: [
            {
              avalue: likeKeyword,
            },
          ],
        },
      ],
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

  @AsyncTryCatch()
  async getNFTs({ where }: GetNFTsInput): Promise<NFTsOutput> {
    if (!where || where.length === 0) return Err(`invalid input 'where'`);

    // map targets to like texts
    let i = 0;
    for (const { name, description, attributes } of where) {
      if (name) where[i].name = Like(`%${name}%`) as unknown as string;

      if (description)
        where[i].description = Like(`%${description}%`) as unknown as string;

      if (attributes) {
        let j = 0;
        for (const { atype, akey, avalue } of attributes) {
          if (atype)
            where[i].attributes[j].atype = Like(
              `%${atype}%`,
            ) as unknown as string;

          if (akey)
            where[i].attributes[j].akey = Like(
              `%${akey}%`,
            ) as unknown as string;

          if (avalue)
            where[i].attributes[j].avalue = Like(
              `%${avalue}%`,
            ) as unknown as string;

          j++;
        }
      }

      i++;
    }

    const nfts = await this.metadataRepo.find({
      where,
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

  @AsyncTryCatch()
  async cacheNFT(transaction: CacheNFTInput): Promise<NFTOutput> {
    // check if there is it in our db
    const nft = await this.metadataRepo.findOne({
      where: { transaction },
    });
    if (nft) {
      return Ok({
        tid: nft.tid,
        name: nft.name,
        description: nft.description,
        attributes: nft.attributes,
        url: this.metadataToS3URL(nft),
      });
    }

    const { txhash } = transaction;
    const txInfo = await this.web3.getTransaction(txhash);

    if (typeof txInfo !== 'object') return Err(`invalid transaction hash`);

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
    const ok_metadataObj = unwrap(await this.mfs.fetchFromIPFS(fileCid));
    if (typeof ok_metadataObj !== 'object')
      return Err(`file is not metadata structure json style`);

    const tid = unwrap(await this.web3.cryptosea.getTokenId(txhash)); // token id

    const metadataObj = {
      ...ok_metadataObj,
      tid,
      transaction: {
        txhash,
      },
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
        await this.mfs.fetchFromIPFS<Readable>(CID.parse(metadata.cid), {
          responseType: 'stream',
        }),
      );
      if (ok_file === undefined)
        return Err(`file not found cid from ipfs nodes`);

      // upload to S3
      fileS3URL = await this.mfs.uploadFileToS3(
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
}
