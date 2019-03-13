import { ConnextEntitiesPayload } from './types';

export const connexEntitiesMutations = {
  ['CONNEX_ENTITIES_LOADED']: (
    state: any,
    { success, name, error }: ConnextEntitiesPayload,
  ) => {
    if (!state.connexEntitiesLoaded) {
      state.connexEntitiesLoaded = {};
    }
    state.connexEntitiesLoaded[name] = success;
    if (error) {
      state.connexEntitiesError[name] = error;
    }
  },
  ['EXTERNAL_WALLET_PERMISSION']: (
    state: any,
    { success, error }: ConnextEntitiesPayload,
  ) => {
    state.requestedExternalWalletPermission = success;
    if (error) {
      state.externalWalletError = error;
    }
  },
};
