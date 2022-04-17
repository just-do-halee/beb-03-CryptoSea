import { Inject, Injectable } from '@nestjs/common';
import { EthService, Web3ModuleOptions } from './web3.interfaces';
import { AsyncTryCatch } from 'src/common/decorators/trycatch.decorator';
import { Result } from 'src/common/types/result.type';
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
    await this.subscribeNFTs();
  }

  private processTxHash(hashStr: string): string {
    // to lower case
    hashStr = hashStr.toLowerCase();
    // detach initial 0x
    if (hashStr[0] === '0' && hashStr[1] === 'x') return hashStr.slice(2);
    return hashStr;
  }

  @AsyncLogIt(`subscribeNFTs()`)
  private async subscribeNFTs(): Promise<void> {
    console.log(this.contractAddr);
    this.eth.subscribe(
      'logs',
      {
        address: [this.contractAddr],
        topics: [this.topicAddrTokenURI],
      },
      async (_error, log) => {
        try {
          const tokenIdHex = log.topics[3];
          if (!tokenIdHex) return;
          const tid = this.api.utils.hexToNumber(tokenIdHex) as number;
          console.log('incoming caching.... tokenId:', tid);
          if (log['removed'] === true) {
            // remove caching
            await this.metadataRepo.delete({ tid });
          } else {
            // caching
            await this.saveFromTokenIdOrURI(tid, log.transactionHash);
          }
        } catch (e) {
          console.error(e);
        }
      },
    );
  }

  // if the tx is valid then returns tokenURI or tokenID
  isValidTransaction(tx: any): string | number | undefined {
    if (!tx || typeof tx !== 'object') return;
    const { to, logs } = tx;

    if (!logs) {
      // normal transaction
      if (
        !tx.input ||
        typeof to !== 'string' ||
        to.toLowerCase() !== this.contractAddr
      )
        return;
      try {
        const res = this.api.decode(tx.input, 'tokenURI');
        if (res) {
          return res.tokenURI;
        }
      } catch (e) {
        console.error(e);
        return;
      }
      return;
    }

    // transaction receipt
    if (
      typeof to !== 'string' ||
      to.toLowerCase() !== this.contractAddr ||
      !Array.isArray(logs) ||
      !logs[0] ||
      !Array.isArray(logs[0].topics) ||
      typeof logs[0].topics[0] !== 'string' ||
      logs[0].topics[0].toLowerCase() !== this.topicAddrTokenURI ||
      !logs[0].topics[3]
    )
      return;
    try {
      return this.api.utils.hexToNumber(logs[0].topics[3]);
    } catch (_) {
      return;
    }
  }

  private async saveFromTokenIdOrURI(
    tokenInfo: number | string,
    txhash: string,
  ) {
    let metaCID: string = '';
    let tid: number = 0;
    if (typeof tokenInfo === 'string') {
      metaCID = tokenInfo;
      const { ok } = await this.getTokenId(txhash);
      if (!ok) throw new Error(`invalid transaction hash`);
      tid = ok;
    } else {
      metaCID = await this.api.getTokenURI(tokenInfo);
      tid = tokenInfo;
    }

    if (!metaCID) throw new Error(`invalid tokenURI`);

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
        txhash: this.processTxHash(txhash),
      },
    });

    await validateOrReject(metadata);

    // upload to RDBMS
    await this.metadataRepo.save(metadata);
  }

  @AsyncLogIt(`scrapeNFTs()`)
  private async scrapeNFTs(): Promise<void> {
    const total = await this.api.getTotalSupply();

    const result = await this.metadataRepo.query(
      `SELECT MAX(${`tid`}) FROM ${`metadata`};`,
    );

    let totalCached =
      Array.isArray(result) && typeof result[0].max === 'number'
        ? result[0].max
        : 0;

    console.log('total supply:', total);
    console.log('total cached:', totalCached);

    if (total === totalCached) {
      console.log(`done scrapping NFTs`);
      return;
    }
    if (total < totalCached)
      throw new Error(
        `the cached total supply is more than actual total supply`,
      );

    totalCached++;

    for (let tid = totalCached; tid <= total; tid++) {
      try {
        const blockNumber = await this.api.getBlockNumber(tid);
        console.log(`${tid} -> blockNumber: ${blockNumber}`);
        // finds transaction hash
        for (let i = 0; ; i++) {
          const tx = await this.eth.getTransactionFromBlock(blockNumber, i);
          if (!tx) break;
          const tokenURI = this.isValidTransaction(tx);
          if (typeof tokenURI === 'string') {
            await this.saveFromTokenIdOrURI(tid, tx.hash);
            break;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    console.log(`scrapping complete`);
    return;
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
    const tokenId = this.isValidTransaction(txInfo);
    if (typeof tokenId === 'number') {
      return Ok(tokenId);
    }
    return Err(`invalid transaction hash`);
  }
}
