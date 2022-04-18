import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule as _ } from './env/env.module';
import { NFTModule } from './nft/nft.module';
import { Web3Module } from './web3/web3.module';
import { MfsModule } from './mfs/mfs.module';

@Module({
  imports: [
    ..._.forRoot(),
    MfsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: _.envs.DB_HOST_,
      port: ~~_.envs.DB_PORT_,
      username: _.envs.DB_USERNAME_,
      password: _.envs.DB_PASSWORD_,
      database: _.envs.DB_NAME_,
      synchronize: _.MODE !== 'prod',
      logging: _.MODE !== 'prod',
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    NFTModule.forRoot({
      confirmation: ~~_.envs.WEB3_CRYPTOSEA_CONFIRMATION_,
    }),
    Web3Module.forRoot({
      provider: _.envs.WEB3_PROVIDER_URL_,
      secretKey: _.envs.WEB3_SECRET_KEY_,
      contractAddr: {
        cryptosea: _.envs.WEB3_CRYPTOSEA_CONTADDR_.toLowerCase(),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
