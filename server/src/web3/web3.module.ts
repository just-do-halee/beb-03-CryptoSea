import { DynamicModule, Global, Module } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { CONFIG_OPTIONS } from './web3.constants';
import { Web3ModuleOptions } from './web3.interfaces';

@Global()
@Module({})
export class Web3Module {
  static forRoot(options: Web3ModuleOptions): DynamicModule {
    return {
      module: Web3Module,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        Web3Service,
      ],
      exports: [Web3Service],
    };
  }
}
