import { CID } from 'multiformats/cid';

export function isCID(s: string): boolean {
  try {
    CID.parse(s);
    return true;
  } catch (e) {
    return false;
  }
}
