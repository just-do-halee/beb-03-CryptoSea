import { Type } from '@nestjs/common';
import { OmitType } from '@nestjs/graphql';
import { coreInstance, coreEntityKeys } from '../entities/core.entity';
import { AsyncIntervalOption } from '../types/core.type';

export function OmitCore<T extends typeof coreInstance>(classRef: Type<T>) {
  return OmitType(classRef, coreEntityKeys);
}

export function setAsyncTimeout(ms: number): Promise<never> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function setAsyncInterval<T>(
  callback: () => T,
  options?: AsyncIntervalOption<T>,
): Promise<T> {
  options = {
    ms: 2000,
    condition: async () => false,
    maxCount: 100,
    errorMessage: () => `timeout`,
    ...options,
  };
  const { ms, condition, maxCount, errorMessage } = options;

  let ret,
    i = 0;
  while (!(await condition())) {
    await setAsyncTimeout(ms);
    ret = callback();
    if (i >= maxCount) {
      throw new Error(errorMessage(ret));
    }
    i++;
  }
  return ret;
}
