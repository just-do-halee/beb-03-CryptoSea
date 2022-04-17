import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { OmitCore } from 'src/common/functions/core.function';
import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Metadata } from './metadata.entity';
import {
  ATYPE_MIN_LENGTH,
  ATYPE_MAX_LENGTH,
  AKEY_MIN_LENGTH,
  AKEY_MAX_LENGTH,
  AVALUE_MIN_LENGTH,
  AVALUE_MAX_LENGTH,
} from './metadata.function';

@InputType('MetaAttributeInput')
@ObjectType()
@Entity()
export class MetaAttribute {
  @PrimaryGeneratedColumn()
  id: number;
  @Field(() => String)
  @IsString()
  @Length(ATYPE_MIN_LENGTH, ATYPE_MAX_LENGTH)
  @Column()
  atype: string;
  @Field(() => String)
  @IsString()
  @Length(AKEY_MIN_LENGTH, AKEY_MAX_LENGTH)
  @Column()
  akey: string;
  @Field(() => String)
  @IsString()
  @Length(AVALUE_MIN_LENGTH, AVALUE_MAX_LENGTH)
  @Column()
  avalue: string;

  @ManyToMany(() => Metadata, (metadata: Metadata) => metadata.attributes)
  metadata: Metadata;
}

@InputType('PartialMetaAttributeInput')
@ObjectType()
export class PartialMetaAttribute extends PartialType(MetaAttribute) {}
