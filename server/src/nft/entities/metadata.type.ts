import { registerEnumType } from '@nestjs/graphql';

export enum Ctype {
  IPFS = 'ipfs',
}

registerEnumType(Ctype, { name: 'Ctype' });
