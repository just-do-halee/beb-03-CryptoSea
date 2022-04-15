import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsEnum,
  IsHash,
  IsLowercase,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import {
  IsCID,
  IsMetaAttributes,
} from 'src/common/decorators/validator.decorator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';
import { Ctype } from './metadata.type';
import {
  CEXT_MIN_LENGTH,
  CEXT_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from './metadata.function';
import { MetaAttribute } from './metaattribute.entity';

@InputType('MetadataInput')
@ObjectType()
@Entity()
@Unique(['txhash', 'tid', 'cid'])
export class Metadata extends CoreEntity {
  @Field(() => String)
  @IsLowercase()
  @IsHash('sha256')
  @Column()
  txhash: string;

  @Field(() => Number)
  @IsNumber()
  @Column()
  tid: number;

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

  @Field(() => [MetaAttribute], {
    nullable: true,
  })
  @IsMetaAttributes()
  @ManyToMany(
    () => MetaAttribute,
    (attribute: MetaAttribute) => attribute.metadata,
    {
      nullable: true,
      cascade: ['insert', 'update'],
    },
  )
  @JoinTable()
  attributes?: MetaAttribute[];
}
