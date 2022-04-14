import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsHash, IsLowercase, IsString, Length } from 'class-validator';
import {
  IsCID,
  IsMetaAttributes,
} from 'src/common/decorators/validator.decorator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';
import { Ctype } from './metadata.type';
import {
  CEXT_MIN_LENGTH,
  CEXT_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  ATYPE_MIN_LENGTH,
  ATYPE_MAX_LENGTH,
  AKEY_MIN_LENGTH,
  AKEY_MAX_LENGTH,
  AVALUE_MIN_LENGTH,
  AVALUE_MAX_LENGTH,
} from './metadata.function';

@InputType('MetaAttributeInput')
@ObjectType()
export class MetaAttribute {
  @Field(() => String)
  @IsString()
  @Length(ATYPE_MIN_LENGTH, ATYPE_MAX_LENGTH)
  atype: string;
  @Field(() => String)
  @IsString()
  @Length(AKEY_MIN_LENGTH, AKEY_MAX_LENGTH)
  akey: string;
  @Field(() => String)
  @IsString()
  @Length(AVALUE_MIN_LENGTH, AVALUE_MAX_LENGTH)
  avalue: string;
}

@InputType('MetadataInput')
@ObjectType()
@Entity()
export class Metadata extends CoreEntity {
  @Field(() => String)
  @IsLowercase()
  @IsHash('sha256')
  @Column()
  txhash: string;

  @Field(() => Ctype)
  @IsLowercase()
  @IsEnum(Ctype)
  @Column({ type: 'enum', enum: Ctype })
  ctype: Ctype;

  @Field(() => String)
  @IsCID()
  @Column()
  cid: string;

  @Field(() => String)
  @IsString()
  @Length(CEXT_MIN_LENGTH, CEXT_MAX_LENGTH)
  @Column()
  cext: string;

  @Field(() => String)
  @IsString()
  @Length(NAME_MIN_LENGTH, NAME_MAX_LENGTH)
  @Column()
  name: string;

  @Field(() => String)
  @IsString()
  @Length(DESCRIPTION_MIN_LENGTH, DESCRIPTION_MAX_LENGTH)
  @Column()
  description: string;

  @Field(() => [MetaAttribute], { nullable: true })
  @IsMetaAttributes()
  @Column({ type: 'json', default: `[]` })
  attributes?: MetaAttribute[];

  // @BeforeInsert()
  // @BeforeUpdate()
  // async stringifyAttribute() {

  // }
}
