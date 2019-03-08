import { connexAction } from './connextAction';
import { ContractSetting } from '@decent-bet/connex-entities/types';

export const boot = (contracts: ContractSetting[]) => {
  return connexAction(async ({ requestExternalWalletAccess, setupContracts, }) => {
    await requestExternalWalletAccess();
    setupContracts(contracts);
  });
};
