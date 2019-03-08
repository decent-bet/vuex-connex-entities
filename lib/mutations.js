"use strict";
exports.__esModule = true;
var _a;
var connextAction_1 = require("./connextAction");
exports.connextEntitiesMutations = (_a = {},
    _a[connextAction_1.PREFIX + "/SET_ENTITIES_LOADED"] = function (state, entitiesLoaded) {
        state.entitiesLoaded = entitiesLoaded;
    },
    _a[connextAction_1.PREFIX + "/EXTERNAL_WALLET_PERMISSION"] = function (state, requestedExternalWalletPermission) {
        state.requestedExternalWalletPermission = requestedExternalWalletPermission;
    },
    _a);
