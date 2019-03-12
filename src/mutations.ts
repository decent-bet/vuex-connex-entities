import { ConnextEntitiesPayload } from './types';

export const connextEntitiesMutations = {
  ['CONNEX_ENTITIES_LOADED']: (
    state: any,
    { success, error }: ConnextEntitiesPayload,
  ) => {
    state.connexEntitiesLoaded = success;
    if (error) {
      state.connexEntitiesError = error;
    }
  },
  ['EXTERNAL_WALLET_PERMISSION']: (
    state: any,
    { success, error }: ConnextEntitiesPayload,
  ) => {
    state.requestedExternalWalletPermission = success;
    if (error) {
      state.ExternalWalletError = error;
    }
  },
};
