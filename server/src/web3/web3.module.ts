import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metadata } from 'src/nft/entities/metadata.entity';
import { CryptoSeaService } from './cryptosea.service';
import { CONFIG_OPTIONS } from './web3.constants';
import { Web3ModuleOptions } from './web3.interfaces';
import { Web3Service } from './web3.service';
import { MfsModule } from '../mfs/mfs.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Metadata]), MfsModule],
  providers: [],
})
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
        CryptoSeaService,
      ],
      exports: [Web3Service, CryptoSeaService],
    };
  }
}
