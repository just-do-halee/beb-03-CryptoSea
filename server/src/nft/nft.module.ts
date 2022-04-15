import { DynamicModule, Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metadata } from './entities/metadata.entity';
import { NFTResolver } from './nft.resolver';
import { NFTService } from './nft.service';
import { NFTModuleOptions } from './nft.interface';
import { CONFIG_OPTIONS } from './nft.constants';
import { MetaAttribute } from './entities/metaattribute.entity';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
    TypeOrmModule.forFeature([Metadata, MetaAttribute]),
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
