import { Global, Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';
import { EnvModuleOptions } from './env.interfaces';
import { CONFIG_OPTIONS } from './env.constants';
import { getMode, joinMode, getEnvs } from 'modern-v';
import * as Joi from 'joi';

@Global()
@Module({})
export class EnvModule {
  static readonly MODE = getMode({ strict: true });
  static readonly config = joinMode(EnvModule.MODE, {
    /* ********* CAN BE MODIFIED *********** */
    env: '.env.',
    DB_HOST_: '',
    DB_PORT_: '',
    DB_USERNAME_: '',
    DB_PASSWORD_: '',
    DB_NAME_: '',
    SECRET_KEY_: '',
    AWS_BUCKET_NAME_: '',
    AWS_ACCESS_KEY_: '',
    AWS_SECRET_ACCESS_KEY_: '',
    WEB3_PROVIDER_URL_: '',
    WEB3_SECRET_KEY_: '',
    WEB3_CRYPTOSEA_CONTADDR_: '',
    WEB3_CRYPTOSEA_CONFIRMATION_: '',
    /* ********* CAN BE MODIFIED *********** */
  });
  // mode-one
  static envs = getEnvs(EnvModule.config, {
    exceptKeys: ['env'],
  });

  static forRoot(options: EnvModuleOptions = { a: 'test' }): DynamicModule[] {
    const { config } = EnvModule;

    const configModule = ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: config.env,
      ignoreEnvFile: config.__MODE__ === 'prod',
      validationSchema: Joi.object({
        /** TODO */
      }),
    });
    EnvModule.envs = getEnvs(config, {
      exceptKeys: ['env'],
      strict: true, // validating requirement
    });

    return [
      configModule,
      {
        module: EnvModule,
        providers: [
          {
            provide: CONFIG_OPTIONS,
            useValue: options,
          },
          EnvService,
        ],
        exports: [EnvService],
      },
    ];
  }
}
