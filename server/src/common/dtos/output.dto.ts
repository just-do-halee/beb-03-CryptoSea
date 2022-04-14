import { ObjectType } from '@nestjs/graphql';
import { Result } from '../types/result.type';
import { ResField } from '../decorators/result.decorator';

@ObjectType()
export abstract class BaseOutput<Ok> implements Result<Ok, string> {
  abstract ok?: Ok;
  @ResField(() => String)
  error?: string;
}
