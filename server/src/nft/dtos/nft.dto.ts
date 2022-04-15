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
import {
  MetaAttribute,
  PartialMetaAttribute,
} from '../entities/metaattribute.entity';
import { OmitCore } from 'src/common/functions/core.function';
import { IsHash, IsUrl } from 'class-validator';
import { IsMetaAttributes } from 'src/common/decorators/validator.decorator';

@ArgsType()
export class CacheNFTInput {
  @Field(() => String)
  @IsHash('sha256')
  txhash: string;
}

// @InputType()
// export class NFTInput extends PartialType(OmitCore(Metadata)) {}

@InputType()
export class GetNFTsInput extends PartialType(
  OmitType(Metadata, ['attributes']),
) {
  @Field(() => [PartialMetaAttribute], { nullable: true })
  @IsMetaAttributes({
    partial: true,
  })
  attributes?: PartialMetaAttribute[];
}

@ObjectType()
export class OutputMetadata extends OmitType(
  OmitCore(Metadata),
  ['txhash', 'ctype', 'cid', 'cext', 'attributes'],
  ObjectType,
) {
  @Field(() => String)
  @IsUrl()
  url: string;
  @Field(() => [MetaAttribute], { nullable: true })
  @IsMetaAttributes()
  attributes?: MetaAttribute[];
}

@ObjectType()
export class NFTOutput extends BaseOutput<OutputMetadata> {
  @ResField(() => OutputMetadata)
  ok?: OutputMetadata;
}

@ObjectType()
export class ExtMetadata extends Metadata {
  @Field(() => String)
  @IsUrl()
  url: string;
}

@ObjectType()
export class NFTsOutput extends BaseOutput<ExtMetadata[]> {
  @ResField(() => [ExtMetadata])
  ok?: ExtMetadata[];
}
