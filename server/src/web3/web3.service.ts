import { Inject, Injectable } from '@nestjs/common';
import { EnvService } from '../env/env.service';
import { CONFIG_OPTIONS } from './web3.constants';
import { Web3ModuleOptions } from './web3.interfaces';
import * as CAPI from 'cryptosea-api';

@Injectable()
export class Web3Service {
  readonly cryptosea: any;
  private readonly provider: any;
  private readonly secretKey: string;
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly options: Web3ModuleOptions,
    private readonly env: EnvService,
  ) {
    const { provider, secretKey } = options;
    this.cryptosea = CAPI.new(provider, env.get('WEB3_CRYPTOSEA_CONTADDR_'));
    this.provider = provider;
    this.secretKey = secretKey;
  }
  async reset(): Promise<void> {
    await this.cryptosea.connectWallet(this.secretKey);
  }
}
