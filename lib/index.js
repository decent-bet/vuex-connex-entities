"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const connex_entities_1 = require("@decent-bet/connex-entities");
const connex_entities_2 = require("@decent-bet/connex-entities");
function ConnexEntityContract(Vue, options) {
    Vue.prototype.$contractEntities = {};
    if (options.entities) {
        options.entities.forEach((i) => {
            // eslint-disable-next-line new-cap
            Vue.prototype.$contractEntities[i.name] = new i.contract();
        });
    }
    Vue.prototype.$requestExternalWalletAccess = () => __awaiter(this, void 0, void 0, function* () {
        if (process.browser) {
            connex_entities_1.ConnexService.instance = window.connex;
            const rq = connex_entities_2.CometService.requestExternalWalletAccess(window.thor, window.connex);
            const { chainTag, publicAddress } = yield rq();
            connex_entities_1.ConnexService.chainTag = chainTag;
            connex_entities_1.ConnexService.defaultAccount = publicAddress;
            Vue.prototype.$connex = connex_entities_1.ConnexService;
        }
    });
}
exports.ConnexEntityContract = ConnexEntityContract;
