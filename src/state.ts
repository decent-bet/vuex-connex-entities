export interface IConnexEntitiesState {
    entitiesLoaded: boolean;
    requestedExternalWalletPermission: boolean;
}


export const ConnexEntitiesDefaultState = (): IConnexEntitiesState => ({
    entitiesLoaded: false,
    requestedExternalWalletPermission: false
});
  
