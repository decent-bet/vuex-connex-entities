/* eslint-disable no-param-reassign */
import { CometService, ConnexService, OnConnexReady } from '@decent-bet/connex-entities';
import { ContractSetting, IConnexContract } from '@decent-bet/connex-entities/types';
import { ActionContext } from 'vuex';

function requestExternalWalletAccess<S, R>({ commit }: ActionContext<S, R>) {
  return async () => {
    const { connex, thor } = window as any;
    (ConnexService as any).instance = connex;
    const rq = CometService.requestExternalWalletAccess(thor, connex);
    const { chainTag, publicAddress } = await rq();
    (ConnexService as any).chainTag = chainTag;
    (ConnexService as any).defaultAccount = publicAddress;
    commit('EXTERNAL_WALLET_PERMISSION', true);
  };
}

function setupContracts<S, R>({ commit }: ActionContext<S, R>) {
  return async (contracts: ContractSetting[]) => {
    const connex = window.connex;
    const rq = CometService.requestExternalWalletAccess((window as any).thor, window.connex);
    const { chainTag, publicAddress } = await rq();

    contracts.forEach((i: { name: string | number; contract: new () => IConnexContract; }) => {
      // eslint-disable-next-line new-cap
      const instance = new i.contract() as OnConnexReady;
      instance.onConnexReady(connex as Connex, chainTag, publicAddress);
      (ConnexService as any).contractInstances[i.name] = instance;
    });
    commit('SET_ENTITIES_LOADED', true);
  };
}

export function connexAction<T>(action: <S, R>(context: ActionContext<S, R>, payload: any) => T) {
  return <S, R>(context: ActionContext<S, R>, payload: any) => {
    context.setupContracts = setupContracts(context);
    context.requestExternalWalletAccess = requestExternalWalletAccess<S, R>(context);
    context.$contractEntities = (ConnexService as any).contractInstances;
    context.$connex = (ConnexService as any).instance;
    return action(context, payload);
  };
}
