import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { EnvModule } from 'src/env/env.module';
import { MfsService } from './mfs.service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
  ],
  providers: [MfsService],
  exports: [MfsService],
})
export class MfsModule {}
