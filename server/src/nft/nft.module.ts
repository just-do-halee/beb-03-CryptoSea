import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metadata } from './entities/metadata.entity';
import { NFTResolver } from './nft.resolver';
import { NFTService } from './nft.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
    TypeOrmModule.forFeature([Metadata]),
  ],
  providers: [NFTResolver, NFTService],
  exports: [NFTService],
})
export class NFTModule {}
