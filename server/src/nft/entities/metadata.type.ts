import { registerEnumType } from '@nestjs/graphql';

/** Ctype Type */

export enum Ctype {
  IPFS = 'ipfs',
}

registerEnumType(Ctype, { name: 'Ctype' });

/** MetaAttribute Type */

export type MetaAttribute = {
  atype: string;
  akey: string;
  avalue: string | number;
};
