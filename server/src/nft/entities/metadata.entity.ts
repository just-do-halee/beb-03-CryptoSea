import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsEnum,
  IsHash,
  IsLowercase,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import {
  IsCID,
  IsMetaAttributes,
} from 'src/common/decorators/validator.decorator';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  Unique,
} from 'typeorm';
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
import { Transaction } from './transaction.entity';

@InputType('MetadataInput')
@ObjectType()
@Entity()
@Unique(['tid', 'cid'])
export class Metadata extends CoreEntity {
  @Field(() => Transaction)
  @ValidateNested()
  @OneToOne(() => Transaction, { eager: true, cascade: true })
  @JoinColumn({ name: 'transaction' })
  transaction: Transaction;

  @Field(() => Number)
  @IsNumber()
  @Column({ type: 'integer' })
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
  // @IsMetaAttributes()
  @ValidateNested({ each: true })
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
