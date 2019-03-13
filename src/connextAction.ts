import { ActionContext } from 'vuex';
import { CONTRACT_INSTANCES, getContract, requestExternalWalletAccess, WALLET_INFO } from './utils';

export function connexAction<T>(
  action: <S, R>(context: ActionContext<S, R>, payload: any) => T,
) {
  return <S, R>(context: ActionContext<S, R>, payload: any) => {
    context.requestExternalWalletAccess = requestExternalWalletAccess<S, R>(
      context
    );
    context.getContract = getContract(context);
    context.walletInfo = WALLET_INFO;
    return action(context, payload);
  };
}
