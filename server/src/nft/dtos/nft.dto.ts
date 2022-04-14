import {
  Field,
  ArgsType,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { ResField } from 'src/common/decorators/result.decorator';
import { BaseOutput } from 'src/common/dtos/output.dto';
import { Metadata } from '../entities/metadata.entity';
import { OmitCore } from 'src/common/functions/core.function';
import { IsHash, IsUrl } from 'class-validator';

@ArgsType()
export class CacheNFTInput {
  @Field(() => String)
  @IsHash('sha256')
  txhash: string;
}

@InputType()
export class NFTInput extends PartialType(OmitCore(Metadata)) {}

@ObjectType()
export class OutputMetadata extends OmitType(
  OmitCore(Metadata),
  ['txhash', 'ctype', 'cid', 'cext'],
  ObjectType,
) {
  @Field(() => String)
  @IsUrl()
  url: string;
}

@ObjectType()
export class NFTOutput extends BaseOutput<OutputMetadata> {
  @ResField(() => OutputMetadata)
  ok?: OutputMetadata;
}

@ObjectType()
export class NFTsOutput extends BaseOutput<OutputMetadata[]> {
  @ResField(() => [OutputMetadata])
  ok?: OutputMetadata[];
}
