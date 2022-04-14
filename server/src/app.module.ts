import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule as _ } from './env/env.module';
import { NFTModule } from './nft/nft.module';
import { Metadata } from './nft/entities/metadata.entity';
import { Web3Module } from './web3/web3.module';

@Module({
  imports: [
    ..._.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: _.envs.DB_HOST_,
      port: ~~_.envs.DB_PORT_,
      username: _.envs.DB_USERNAME_,
      password: _.envs.DB_PASSWORD_,
      database: _.envs.DB_NAME_,
      synchronize: _.MODE !== 'prod',
      logging: _.MODE !== 'prod',
      // autoLoadEntities: true,
      entities: [Metadata],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      // context: ({ req }) => ({ user: req['user'] }),
      driver: ApolloDriver,
    }),
    Web3Module.forRoot({
      provider: _.envs.WEB3_PROVIDER_URL_,
      secretKey: _.envs.WEB3_SECRET_KEY_,
    }),
    // JwtModule.forRoot(),
    NFTModule.forRoot({
      confirmation: ~~_.envs.WEB3_CRYPTOSEA_CONFIRMATION_,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  //implements NestModule {
  // Middlewares...
  // configure(consumer: MiddlewareConsumer) {
  //   // consumer.apply(JwtMiddleware).forRoutes({
  //   //   path: '/graphql',
  //   //   method: RequestMethod.POST,
  //   // });
  // }
}
