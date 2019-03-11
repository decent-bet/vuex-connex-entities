export const connextEntitiesMutations = {
  ['SET_ENTITIES_LOADED']: (
    state: any,
    entitiesLoaded: boolean,
  ) => {
    state.entitiesLoaded = entitiesLoaded;
  },
  ['EXTERNAL_WALLET_PERMISSION']: (
    state: any,
    requestedExternalWalletPermission: boolean,
  ) => {
    state.requestedExternalWalletPermission = requestedExternalWalletPermission;
  },
};
