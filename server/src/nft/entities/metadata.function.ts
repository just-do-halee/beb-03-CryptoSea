import { isByteLength } from 'class-validator';
import { MetaAttribute } from './metadata.type';

export const CEXT_MIN_LENGTH = 1;
export const CEXT_MAX_LENGTH = 10;

export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 10000;
export const DESCRIPTION_MIN_LENGTH = 1;
export const DESCRIPTION_MAX_LENGTH = 50000;

export const ATYPE_MIN_LENGTH = 1;
export const ATYPE_MAX_LENGTH = 1000;
export const AKEY_MIN_LENGTH = 1;
export const AKEY_MAX_LENGTH = 2000;
export const AVALUE_MIN_LENGTH = 1;
export const AVALUE_MAX_LENGTH = 10000;

export function isMetaAttribute(obj: object): obj is MetaAttribute {
  const { atype, akey, avalue } = obj as MetaAttribute;

  if (
    typeof atype !== 'string' &&
    typeof akey !== 'string' &&
    typeof avalue !== 'string'
  )
    return false;

  if (isByteLength(atype, ATYPE_MIN_LENGTH, ATYPE_MAX_LENGTH) === false)
    return false;
  if (isByteLength(akey, AKEY_MIN_LENGTH, AKEY_MAX_LENGTH) === false)
    return false;
  if (isByteLength(avalue, AVALUE_MIN_LENGTH, AVALUE_MAX_LENGTH) === false)
    return false;

  return true;
}
