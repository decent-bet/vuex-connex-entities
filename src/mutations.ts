import { IConnexEntitiesState } from './state';
import { PREFIX } from './connextAction';


export const connextEntitiesMutations = {
  [`${PREFIX}/SET_ENTITIES_LOADED`]: (
    state: IConnexEntitiesState,
    entitiesLoaded: boolean
  ) => {
    state.entitiesLoaded = entitiesLoaded;
  },
  [`${PREFIX}/EXTERNAL_WALLET_PERMISSION`]: (
    state: IConnexEntitiesState,
    requestedExternalWalletPermission: boolean
  ) => {
    state.requestedExternalWalletPermission = requestedExternalWalletPermission;
  }
};
