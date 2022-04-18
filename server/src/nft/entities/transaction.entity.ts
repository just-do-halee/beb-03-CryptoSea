import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { IsHash, IsLowercase } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@InputType('TransactionInput')
@ObjectType()
@Entity()
@Unique(['id', 'txhash'])
export class Transaction {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;
  @Field(() => String)
  @IsLowercase()
  @IsHash('sha256')
  @Column()
  txhash: string;
}
