import { Field, ArgsType, ObjectType, OmitType } from '@nestjs/graphql';
import { ResField } from 'src/common/decorators/result.decorator';
import { BaseOutput } from 'src/common/dtos/output.dto';
import { Metadata } from '../entities/metadata.entity';
import { OmitCore } from 'src/common/functions/core.function';
import { IsHash, IsUrl, IsBase32, IsLowercase } from 'class-validator';
import { IsCID } from 'src/common/decorators/validator.decorator';

// for test
// @InputType()
// export class NFTInput extends OmitType(OmitCore(Metadata), ['txhash'], InputType) {}

@ArgsType()
export class NFTInput {
  // @Field(() => String)
  // @IsHash('sha256')
  // txAddr: string;
  @Field(() => String)
  @IsCID()
  tokenURI: string;
}

@ObjectType()
export class OutputMetadata extends OmitType(
  OmitCore(Metadata),
  ['txhash', 'ctype', 'cid'],
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
