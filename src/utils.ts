import { CometService, OnConnexReady } from '@decent-bet/connex-entities';
import { IConnexContract } from '@decent-bet/connex-entities/types';
import { ActionContext } from 'vuex/types';
import { WalletInfo } from './types';

// eslint-disable-next-line spaced-comment
/// <reference types="@vechain/connex" />
const commitSettings = { root: true };

function toHex(input: string) {
  // utf8 to latin1
  const s = unescape(encodeURIComponent(input));
  let h = '';
  for (let i = 0; i < s.length; i++) {
      h += s.charCodeAt(i).toString(16);
  }
  return '0x' + h;
}

export const CONTRACT_INSTANCES: any = {};
export const WALLET_INFO: WalletInfo = {
  chainTag: undefined,
  publicAddress: undefined
};

export function getContract<S, R>(
  context: ActionContext<S, R>
) {
  return <T extends IConnexContract>(Ctor: new () => T): T => {
    const name = toHex(Ctor.toString());
    if (!CONTRACT_INSTANCES[name]) {
      setupContract<T, S, R>(Ctor, context, name);
    }

    const contract = CONTRACT_INSTANCES[name];
    if (!contract) {
      throw new Error(
        `Requested instance for contract named ${name} not found.`
      );
    }
    return contract as T;
  };
}

export function setupContract<T extends IConnexContract, S, R>(
  Ctor: new () => T,
  { commit }: ActionContext<S, R>,
  name: string
): void {
  const { connex } = window as any;
  if (!connex) {
    const error = new Error('Connex not found in window object.');
    commit('CONNEX_ENTITIES_LOADED', { success: false, name: 'Global', error }, commitSettings);
    throw error;
  }

  const { chainTag, publicAddress } = WALLET_INFO;
  const contract = new Ctor();
  ((contract as unknown) as OnConnexReady).onConnexReady(
    connex as Connex,
    chainTag || '',
    publicAddress || ''
  );
  CONTRACT_INSTANCES[name] = contract;
  commit('CONNEX_ENTITIES_LOADED', { success: true, name }, commitSettings);
}

export function requestExternalWalletAccess<S, R>(
  context: ActionContext<S, R>
) {
  return async (): Promise<boolean> => {
    const { commit } = context;
    const { connex, thor } = window as any;
    if (!connex) {
      const error = new Error('Connext not found in window object.');
      commit('EXTERNAL_WALLET_PERMISSION', { success: false, error }, commitSettings);
      throw error;
    }

    if (!thor) {
      const error = new Error('thor not found in window object.');
      commit('EXTERNAL_WALLET_PERMISSION', { success: false, error }, commitSettings);
      throw error;
    }

    const rq = CometService.requestExternalWalletAccess(thor, connex);
    const { chainTag, publicAddress } = await rq();

    if (!chainTag || !publicAddress) {
      const error = new Error(
        `No chainTag or publicAddress returned from requestExternalWalletAccess() => values: (chainTag: ${chainTag}, publicAddress: ${publicAddress})`
      );
      commit('EXTERNAL_WALLET_PERMISSION', { success: false, error }, commitSettings);
      return false;
    }

    commit('EXTERNAL_WALLET_PERMISSION', { success: true }, commitSettings);
    WALLET_INFO.chainTag = chainTag;
    WALLET_INFO.publicAddress = publicAddress;

    return true;
  };
}
