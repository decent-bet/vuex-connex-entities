import { ContractSetting } from '@decent-bet/connex-entities/types';
import Vuex, { ActionContext } from 'vuex';

declare module 'vuex/types' {
  export interface ActionContext<S, R> {
      $connex: any;
      $contractEntities: any;
      requestExternalWalletAccess: () => Promise<void>;
      setupContracts: (entities: ContractSetting[]) => void;
    }
}

export * from './connextAction';
export * from './mutations';
