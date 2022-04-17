import { Inject, Injectable } from '@nestjs/common';
import { EthService, Web3ModuleOptions } from './web3.interfaces';
import { AsyncTryCatch } from 'src/common/decorators/trycatch.decorator';
import { BaseResult, Result } from 'src/common/types/result.type';
import { Err, Ok, unwrap } from 'src/common/functions/result.function';
import { Eth } from 'web3-eth';
import * as CAPI from 'cryptosea-api';
import { EnvService } from 'src/env/env.service';
import { Repository } from 'typeorm/repository/Repository';
import { Metadata } from 'src/nft/entities/metadata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AsyncLogIt } from 'src/common/decorators/logs.decorator';
import { CONFIG_OPTIONS } from './web3.constants';
import { Readable } from 'typeorm/platform/PlatformTools';
import { attachExt } from 'src/common/functions/file.function';
import { CID } from 'multiformats';
import { validateOrReject } from 'class-validator';
import { MfsService } from 'src/mfs/mfs.service';
import { FindOptionsWhere } from 'typeorm';

export type CryptoSeaAPI = typeof CAPI;

@Injectable()
export class CryptoSeaService implements EthService {
  readonly eth: Eth;
  readonly api: CryptoSeaAPI;
  readonly contractAddr: string;
  readonly topicAddrTokenURI: string;
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly options: Web3ModuleOptions,
    private readonly env: EnvService,
    private readonly mfs: MfsService,
    @InjectRepository(Metadata)
    private readonly metadataRepo: Repository<Metadata>,
  ) {
    this.contractAddr = options.contractAddr['cryptosea'];
    this.topicAddrTokenURI = this.env.get('WEB3_CRYPTOSEA_TOPIC_TOKENURI_');
    this.api = CAPI.new(options.provider, this.contractAddr);
    this.eth = this.api.eth;
  }

  async init(): Promise<void> {
    await this.api.connectWallet(this.options.secretKey);
    await this.scrapeNFTs();
    // this.eth
    //   .subscribe('logs', {
    //     address: this.contractAddr,
    //     topics: [this.topicAddrTokenURI],
    //   })
    //   .on('data', (log) => {
    //     const txhash = log.transactionHash;
    //     const tid = log.topics; // TODO!
    //     console.log(txhash, tid);
    //   });
  }

  @AsyncLogIt(`scrapeNFTs()`)
  @AsyncTryCatch(`can not scrape NFTs : `)
  private async scrapeNFTs(): Promise<BaseResult> {
    const total = await this.api.getTotalSupply();

    const result = await this.metadataRepo.query(
      `SELECT MAX(${`tid`}) FROM ${`metadata`};`,
    );

    const totalCached =
      Array.isArray(result) && typeof result[0].max === 'number'
        ? result[0].max
        : 1;

    console.log(totalCached);

    if (total === totalCached) {
      console.log(`done scrapping NFTs`);
      return Ok(true);
    }
    if (total < totalCached)
      return Err(`the cached total supply is more than actual total supply`);

    for (let tid = totalCached; tid <= total; tid++) {
      const metaCID = await this.api.getTokenURI(tid);

      if (!metaCID) continue;

      try {
        const metadataObj = await this.fetchMetadataFromCID(metaCID);

        await validateOrReject(metadataObj); // validate metadata from ipfs

        await this.passIfMetadataDoesnExists({ tid });

        // fetch file (image or video... etc)
        const readable = await this.fetchFileFromCID(metadataObj.cid);

        // upload to S3
        const _ = await this.mfs.uploadFileToS3(
          attachExt(metadataObj.cid, metadataObj.cext),
          readable,
        );

        const metadata = this.metadataRepo.create({
          ...(metadataObj as Metadata),
          tid,
          transaction: {
            txhash:
              '0911104ac288b104324ede91120a1b03d11dd3b8ffe6a02c991f0a9feb766101',
          },
        });

        await validateOrReject(metadata);

        // upload to RDBMS
        await this.metadataRepo.save(metadata);
      } catch (_) {}
    }

    console.log(`scrapping complete`);
    return Ok(true);
  }

  private async passIfMetadataDoesnExists(
    where: FindOptionsWhere<Metadata> | FindOptionsWhere<Metadata>[],
  ) {
    const dbMetadata = await this.metadataRepo.findOne({
      where,
      relations: ['attributes'],
    });

    if (dbMetadata) throw new Error(`already cached NFT`);
  }

  private async fetchFileFromCID(cid: string): Promise<Readable> {
    const readable = unwrap(
      await this.mfs.fetchFromIPFS<Readable>(CID.parse(cid), {
        timeout: this.mfs.IPFS_FILE_FETCHING_TIMEOUT,
        responseType: 'stream',
      }),
    );
    if (!readable) throw new Error(`file not found from ipfs node`);
    return readable;
  }

  private async fetchMetadataFromCID(
    cid: string,
  ): Promise<Omit<Metadata, 'transaction'>> {
    const metadataObj = unwrap(await this.mfs.fetchFromIPFS(CID.parse(cid)));

    if (!metadataObj) throw new Error(`file not found from ipfs node`);
    return metadataObj as Omit<Metadata, 'transaction'>;
  }

  @AsyncTryCatch(`couldn't get token id : `)
  async getTokenId(txhash: string): Promise<Result<number, string>> {
    const txInfo = await this.api.getTransactionReceipt(txhash);
    if (typeof txInfo !== 'object') return Err(`invalid transaction hash`);
    const tokenId = this.api.utils.hexToNumber(txInfo.logs[0].topics[3]);
    return Ok(tokenId);
  }
}
