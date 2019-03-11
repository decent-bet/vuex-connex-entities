import { ContractSetting } from '@decent-bet/connex-entities/types';
declare module 'vuex/types' {
    interface ActionContext<S, R> {
        $connex: any;
        $contractEntities: any;
        requestExternalWalletAccess: () => Promise<void>;
        setupContracts: (entities: ContractSetting[]) => void;
    }
}
export * from './connextAction';
export * from './mutations';
