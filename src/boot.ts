import { connexAction } from './connextAction';
import { ContractSetting } from '@decent-bet/connex-entities/types';
import { ActionContext } from 'vuex';

export const bootConnex = <S, R>(contracts: ContractSetting[]): (context: ActionContext<S, R>, payload: any) => Promise<void> => {
  return connexAction(async ({ requestExternalWalletAccess, setupContracts, }): Promise<void> => {
    await requestExternalWalletAccess();
    setupContracts(contracts);
  });
};


