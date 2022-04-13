import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnvService } from 'src/env/env.service';
import { Repository } from 'typeorm';
import { Metadata } from './entities/metadata.entity';
import { NFTInput, NFTOutput } from './dtos/nft.dto';
import { IPFS_HOST_URLS } from './nft.constants';
import { AsyncTryCatch } from 'src/common/decorators/trycatch.decorator';
import { Result } from 'src/common/types/result.type';
import { Err, Ok, unwrap } from 'src/common/functions/result.function';
import { CID } from 'multiformats/cid';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { validateOrReject } from 'class-validator';
import * as AWS from 'aws-sdk';

@Injectable()
export class NFTService {
  private readonly BUCKET_NAME: string;
  constructor(
    private readonly env: EnvService,
    private readonly httpService: HttpService,
    @InjectRepository(Metadata)
    private readonly metadataRepo: Repository<Metadata>,
  ) {
    AWS.config.update({
      credentials: {
        accessKeyId: this.env.get('AWS_ACCESS_KEY_'),
        secretAccessKey: this.env.get('AWS_SECRET_ACCESS_KEY_'),
      },
    });
    this.BUCKET_NAME = this.env.get('AWS_BUCKET_NAME_');
  }

  @AsyncTryCatch()
  private async fetchFromIPFS<T>(
    cid: CID,
    options: AxiosRequestConfig<T> = {
      timeout: 250000, // 2.5 min
    },
  ): Promise<Result<T, string>> {
    const cidStr = cid.toString();

    let errors: Error[] = [];
    for (const rootUrl of IPFS_HOST_URLS) {
      const _url = rootUrl + '/ipfs/' + cidStr;

      let data;
      try {
        await this.httpService.get(_url, options).forEach((res) => {
          data = res.data;
        });
      } catch (e) {
        errors.push(e);
        continue;
      }

      if (data) {
        return Ok(data);
      }
      if (errors.length > 0) return Err(JSON.stringify(errors));
      return Err(`file not found cid from ipfs nodes`);
    }
  }

  @AsyncTryCatch()
  async cacheNFT({ tokenURI }: NFTInput): Promise<NFTOutput> {
    const txhash =
      'd0f9f3aea61a4570d4f4ce54a074c0a73e4d0e41449f0197f4ce1325aebd70f6'; // from client

    // fetch metadata
    const ok_metadataObj = unwrap(
      await this.fetchFromIPFS(CID.parse(tokenURI)),
    );
    if (typeof ok_metadataObj !== 'object')
      return Err(`file is not metadata structure json style`);

    const metadataObj = {
      ...ok_metadataObj,
      txhash,
    } as Metadata;

    const metadata = this.metadataRepo.create(metadataObj);

    await validateOrReject(metadata);

    // fetch file (image or video... etc)
    const ok_file = unwrap(await this.fetchFromIPFS(CID.parse(metadata.cid)));
    if (ok_file === undefined) return Err(`file not found cid from ipfs nodes`);

    // upload to S3
    const fileS3URL = await this.uploadFileToS3(metadata.cid, ok_file);

    // upload to RDBMS
    await this.metadataRepo.save(metadata);

    return Ok({
      name: metadata.name,
      description: metadata.description,
      attributes: metadata.attributes,
      url: fileS3URL,
    });
  }

  @AsyncTryCatch()
  private async uploadFileToS3(name, buffer) {
    const body = Buffer.from(buffer);
    const { BUCKET_NAME } = this; // Upload File to S3
    // TODO :
    // await new AWS.S3()
    //   .putObject({
    //     Bucket: BUCKET_NAME,
    //     ContentEncoding: file.encoding,
    //     ContentType: file.mimetype,
    //     Body: file.createReadStream(),
    //     Key: ipfsURL,
    //     ACL: 'public-read',
    //   })
    //   .promise();

    return `https://${BUCKET_NAME}.s3.amazonaws.com/${name}`;
  }
}
