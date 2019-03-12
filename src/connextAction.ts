import { ActionContext } from 'vuex';
import { WalletInfo } from './types';
import { getContract, requestExternalWalletAccess } from './utils';

export const CONTRACT_INSTANCES: any = {};
export const WALLET_INFO: WalletInfo = {
  chainTag: undefined,
  publicAddress: undefined
};

export function connexAction<T>(
  action: <S, R>(context: ActionContext<S, R>, payload: any) => T,
) {
  return <S, R>(context: ActionContext<S, R>, payload: any) => {
    context.requestExternalWalletAccess = requestExternalWalletAccess<S, R>(
      context,
      WALLET_INFO
    );
    context.getContract = getContract(CONTRACT_INSTANCES, WALLET_INFO, context);
    return action(context, payload);
  };
}
