import { Inject, Injectable } from '@nestjs/common';
import { CryptoSeaService } from './cryptosea.service';
import { CONFIG_OPTIONS } from './web3.constants';
import { EthService, Web3ModuleOptions } from './web3.interfaces';
import { Eth } from 'web3-eth';
import { AsyncTryCatch } from 'src/common/decorators/trycatch.decorator';
import { BaseResult } from 'src/common/types/result.type';
import { Ok } from 'src/common/functions/result.function';

@Injectable()
export class Web3Service {
  eth: Eth;
  isInitialized: boolean = false;
  constructor(
    @Inject(CONFIG_OPTIONS)
    readonly options: Web3ModuleOptions,
    readonly cryptosea: CryptoSeaService,
  ) {
    this.eth = cryptosea.eth; // initial eth
    this.reset().then(() => {
      this.isInitialized = true;
    });
  }
  @AsyncTryCatch(`failed initializing web3 services : `)
  async reset(): Promise<BaseResult> {
    await this.cryptosea.init();
    return Ok(true);
  }
  setEth<T extends EthService>(ethService: T): void {
    this.eth = ethService.eth;
  }
  @AsyncTryCatch(`couldn't get the transaction : `)
  getTransaction(txhash: string): Promise<any> {
    return this.cryptosea.api.getTransaction(txhash);
  }
  @AsyncTryCatch(`couldn't get latest block number : `)
  async getConfirmation(targetBlockNumber: number): Promise<number> {
    const latestBlockNumber = await this.eth.getBlockNumber();
    return latestBlockNumber - targetBlockNumber;
  }
}
