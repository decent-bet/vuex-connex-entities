import { CometService, OnConnexReady } from '@decent-bet/connex-entities';
import { IConnexContract } from '@decent-bet/connex-entities/types';
import { ActionContext } from 'vuex/types';
import { WalletInfo } from './types';

// eslint-disable-next-line spaced-comment
/// <reference types="@vechain/connex" />

export function getContract<S, R>(
  instances: any,
  walletInfo: WalletInfo,
  context: ActionContext<S, R>
) {
  return <T extends IConnexContract>(c: new () => T): T => {
    const contractName = c.constructor.name;
    if (!instances.hasOwnProperty(contractName)) {
      setupContract<T, S, R>(c, walletInfo, instances, context);
    }

    const contract = instances[contractName];
    if (!contract) {
      throw new Error(
        `Requested instance for contract named ${contractName} not found.`
      );
    }
    return contract as T;
  };
}

export function setupContract<T extends IConnexContract, S, R>(
  Ctor: new () => T,
  walletInfo: WalletInfo,
  instances: any = {},
  { commit }: ActionContext<S, R>
): void {
  const { connex } = window as any;
  if (!connex) {
    const error = new Error('Connext not found in window object.');
    commit('CONNEX_ENTITIES_LOADED', { success: false, error });
    throw error;
  }

  const { chainTag, publicAddress } = walletInfo;
  const contract = new Ctor();
  const { name } = Ctor.constructor;
  ((contract as unknown) as OnConnexReady).onConnexReady(
    connex as Connex,
    chainTag || '',
    publicAddress || ''
  );
  instances[name] = contract;

  commit('CONNEX_ENTITIES_LOADED', { success: true, name });
}

export function requestExternalWalletAccess<S, R>(
  context: ActionContext<S, R>,
  walletInfo: WalletInfo
) {
  return async (): Promise<boolean> => {
    const { commit } = context;
    const { connex, thor } = window as any;
    if (!connex) {
      const error = new Error('Connext not found in window object.');
      commit('EXTERNAL_WALLET_PERMISSION', { success: false, error });
      throw error;
    }

    if (!thor) {
      const error = new Error('thor not found in window object.');
      commit('EXTERNAL_WALLET_PERMISSION', { success: false, error });
      throw error;
    }

    const rq = CometService.requestExternalWalletAccess(thor, connex);
    const { chainTag, publicAddress } = await rq();

    if (!chainTag || !publicAddress) {
      const error = new Error(
        `No chainTag or publicAddress returned from requestExternalWalletAccess() => values: (chainTag: ${chainTag}, publicAddress: ${publicAddress})`
      );
      commit('EXTERNAL_WALLET_PERMISSION', { success: false, error });
      return false;
    }

    commit('EXTERNAL_WALLET_PERMISSION', { success: true });
    walletInfo.chainTag = chainTag;
    walletInfo.publicAddress = publicAddress;

    return true;
  };
}
