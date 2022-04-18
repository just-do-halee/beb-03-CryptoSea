import { Inject, Injectable } from '@nestjs/common';
import { EnvModule } from './env.module';
import { CONFIG_OPTIONS } from './env.constants';
import { EnvModuleOptions } from './env.interfaces';

@Injectable()
export class EnvService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: EnvModuleOptions,
  ) {}
  get MODE() {
    return EnvModule.MODE;
  }
  get config() {
    return EnvModule.config;
  }
  get(key: keyof typeof EnvModule.envs): string {
    return EnvModule.envs[key];
  }
}
