import { ConnextEntitiesPayload } from './types';

export const connexEntitiesMutations = {
  ['CONNEX_ENTITIES_LOADED']: (
    state: any,
    { success, name, error }: ConnextEntitiesPayload,
  ) => {
    if (!state.connexEntitiesLoaded) {
      state.connexEntitiesLoaded = {};
    }

    state.connexEntitiesLoaded[name] = { success, error };
  },
  ['EXTERNAL_WALLET_PERMISSION']: (
    state: any,
    { success, error }: ConnextEntitiesPayload,
  ) => {
    state.requestedExternalWalletPermission = { success, error };
  },
};
