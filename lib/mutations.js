"use strict";
exports.__esModule = true;
var _a;
var connex_entities_1 = require("./connex-entities");
exports.connextEntitiesMutations = (_a = {},
    _a[connex_entities_1.PREFIX + "/SET_ENTITIES_LOADED"] = function (state, entitiesLoaded) {
        state.entitiesLoaded = entitiesLoaded;
    },
    _a[connex_entities_1.PREFIX + "/EXTERNAL_WALLET_PERMISSION"] = function (state, requestedExternalWalletPermission) {
        state.requestedExternalWalletPermission = requestedExternalWalletPermission;
    },
    _a);
