"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var mutations_1 = require("./mutations");
var state_1 = require("./state");
exports.ConnextEntitiesModule = {
    namespaced: true,
    state: __assign({}, state_1.ConnexEntitiesDefaultState()),
    mutations: __assign({}, mutations_1.connextEntitiesMutations)
};
