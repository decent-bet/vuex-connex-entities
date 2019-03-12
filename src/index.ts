import { IConnexContract } from '@decent-bet/connex-entities/types';
import Vuex, { ActionContext } from 'vuex';
import { WalletInfo } from './types';

declare module 'vuex/types' {
  export interface ActionContext<S, R> {
      getContract: <T extends IConnexContract>(c: new () => T) => T;
      requestExternalWalletAccess: () => Promise<boolean>;
      walletInfo: WalletInfo;
    }
}

export * from './connextAction';
export * from './mutations';
export * from './types';
