import { IConnexEntitiesState } from './state';


export const connextEntitiesMutations = {
  SET_ENTITIES_LOADED: (
    state: IConnexEntitiesState,
    entitiesLoaded: boolean
  ) => {
    state.entitiesLoaded = entitiesLoaded;
  },
  EXTERNAL_WALLET_PERMISSION: (
    state: IConnexEntitiesState,
    requestedExternalWalletPermission: boolean
  ) => {
    state.requestedExternalWalletPermission = requestedExternalWalletPermission;
  }
};
