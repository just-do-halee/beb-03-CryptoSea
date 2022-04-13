import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { EnvService } from '../env/env.service';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
  private readonly secretKey: string;
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
    private readonly env: EnvService,
  ) {
    this.secretKey = env.get('SECRET_KEY_');
  }
  sign(userId: number): string {
    return jwt.sign({ id: userId }, this.secretKey);
  }
  verify(token: string) {
    return jwt.verify(token, this.secretKey);
  }
}
