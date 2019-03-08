"use strict";
exports.__esModule = true;
exports.connextEntitiesMutations = {
    SET_ENTITIES_LOADED: function (state, entitiesLoaded) {
        state.entitiesLoaded = entitiesLoaded;
    },
    EXTERNAL_WALLET_PERMISSION: function (state, requestedExternalWalletPermission) {
        state.requestedExternalWalletPermission = requestedExternalWalletPermission;
    }
};
