import { Eth } from 'web3-eth';

export type ContractAddr = {
  [key: string | number | symbol]: string;
};

export interface Web3ModuleOptions {
  provider: any; // temporary
  secretKey: string;
  contractAddr: ContractAddr;
}

export interface EthService {
  eth: Eth;
  init: () => Promise<void>;
}
