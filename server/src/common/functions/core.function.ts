import { Type } from '@nestjs/common';
import { OmitType } from '@nestjs/graphql';
import {
  coreInstance,
  coreEntityKeys,
} from '../entities/core.entity';

export function OmitCore<T extends typeof coreInstance>(classRef: Type<T>) {
  return OmitType(classRef, coreEntityKeys);
}
