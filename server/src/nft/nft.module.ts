import { DynamicModule, Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metadata } from './entities/metadata.entity';
import { NFTResolver } from './nft.resolver';
import { NFTService } from './nft.service';
import { NFTModuleOptions } from './nft.interface';
import { CONFIG_OPTIONS } from './nft.constants';
import { MetaAttribute } from './entities/metaattribute.entity';
import { Transaction } from './entities/transaction.entity';
import { MfsModule } from '../mfs/mfs.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Metadata, MetaAttribute, Transaction]),
    MfsModule,
  ],
  providers: [NFTResolver, NFTService],
  exports: [NFTService],
})
export class NFTModule {
  static forRoot(options: NFTModuleOptions): DynamicModule {
    return {
      module: NFTModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        NFTService,
      ],
      exports: [NFTService],
    };
  }
}
