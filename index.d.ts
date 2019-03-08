import { ActionContext } from 'vuex';
import { ContractSetting } from '@decent-bet/connex-entities/types';

declare module 'vuex' {
  export interface ActionContext<S, R> {
      $connex: any;
      $contractEntities: any;
      requestExternalWalletAccess: () => Promise<void>;
      setupContracts: (entities: ContractSetting[]) => void;
    }
}

export * from './src/index';
