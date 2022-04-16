import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AxiosRequestConfig } from 'axios';
import { CID } from 'multiformats';
import { AsyncTryCatch } from 'src/common/decorators/trycatch.decorator';
import { amazonS3URL, extToMimeType } from 'src/common/functions/file.function';
import { Err, Ok } from 'src/common/functions/result.function';
import { Result } from 'src/common/types/result.type';
import { EnvService } from 'src/env/env.service';
import { IPFS_HOST_URLS } from 'src/nft/nft.constants';
import { Readable } from 'typeorm/platform/PlatformTools';

@Injectable()
export class MfsService {
  readonly IPFS_FILE_FETCHING_TIMEOUT: number;
  readonly BUCKET_NAME: string;
  readonly s3: AWS.S3;
  constructor(
    private readonly env: EnvService,
    private readonly httpService: HttpService,
  ) {
    AWS.config.update({
      credentials: {
        accessKeyId: this.env.get('AWS_ACCESS_KEY_'),
        secretAccessKey: this.env.get('AWS_SECRET_ACCESS_KEY_'),
      },
    });
    this.s3 = new AWS.S3();
    this.IPFS_FILE_FETCHING_TIMEOUT = ~~this.env.get(
      'IPFS_FILE_FETCHING_TIMEOUT_',
    );
    this.BUCKET_NAME = this.env.get('AWS_BUCKET_NAME_');
  }

  @AsyncTryCatch()
  async uploadFileToS3(
    name: string,
    reader: Readable,
    forced: boolean = false,
  ): Promise<Result<string, string>> {
    const { BUCKET_NAME } = this; // Upload File to S3

    if (!forced) {
      // check if exists
      try {
        await this.s3
          .headObject({
            Bucket: BUCKET_NAME,
            Key: name,
          })
          .promise();
        return Ok(amazonS3URL(BUCKET_NAME, name)); // if there is the file already
      } catch (_) {}
    }

    await this.s3
      .upload({
        Bucket: BUCKET_NAME,
        Body: reader,
        ContentType: extToMimeType(name),
        Key: name,
        ACL: 'public-read',
      })
      .promise();

    return Ok(amazonS3URL(BUCKET_NAME, name));
  }

  @AsyncTryCatch()
  async fetchFromIPFS<T>(
    cid: CID,
    options: AxiosRequestConfig<T> = {
      timeout: this.IPFS_FILE_FETCHING_TIMEOUT,
    },
  ): Promise<Result<T, string>> {
    const cidStr = cid.toString();

    let errors: Error[] = [];
    for (const rootUrl of IPFS_HOST_URLS) {
      const _url = rootUrl + '/ipfs/' + cidStr;

      let data;
      try {
        await this.httpService.get(_url, options).forEach((res) => {
          data = res.data; // ---
        });
      } catch (e) {
        errors.push(e);
        continue;
      }

      if (data) {
        return Ok(data);
      }
    }
    if (errors.length > 0) return Err(`ipfs errors: ` + JSON.stringify(errors));

    return Err(`file not found cid from ipfs nodes`);
  }
}
