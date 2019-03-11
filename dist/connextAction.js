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
function requestExternalWalletAccess({ commit }) {
    return () => __awaiter(this, void 0, void 0, function* () {
        const { connex, thor } = window;
        connex_entities_1.ConnexService.instance = connex;
        const rq = connex_entities_1.CometService.requestExternalWalletAccess(thor, connex);
        const { chainTag, publicAddress } = yield rq();
        connex_entities_1.ConnexService.chainTag = chainTag;
        connex_entities_1.ConnexService.defaultAccount = publicAddress;
        commit('EXTERNAL_WALLET_PERMISSION', true);
    });
}
function setupContracts({ commit }) {
    return (contracts) => __awaiter(this, void 0, void 0, function* () {
        const connex = window.connex;
        const rq = connex_entities_1.CometService.requestExternalWalletAccess(window.thor, window.connex);
        const { chainTag, publicAddress } = yield rq();
        contracts.forEach((i) => {
            // eslint-disable-next-line new-cap
            const instance = new i.contract();
            instance.onConnexReady(connex, chainTag, publicAddress);
            connex_entities_1.ConnexService.contractInstances[i.name] = instance;
        });
        commit('SET_ENTITIES_LOADED', true);
    });
}
function connexAction(action) {
    return (context, payload) => {
        context.setupContracts = setupContracts(context);
        context.requestExternalWalletAccess = requestExternalWalletAccess(context);
        context.$contractEntities = connex_entities_1.ConnexService.contractInstances;
        context.$connex = connex_entities_1.ConnexService.instance;
        return action(context, payload);
    };
}
exports.connexAction = connexAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmV4dEFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZXh0QWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsaUVBQXlGO0FBSXpGLFNBQVMsMkJBQTJCLENBQU8sRUFBRSxNQUFNLEVBQXVCO0lBQ3hFLE9BQU8sR0FBUyxFQUFFO1FBQ2hCLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBYSxDQUFDO1FBQ3RDLCtCQUFxQixDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDekMsTUFBTSxFQUFFLEdBQUcsOEJBQVksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEUsTUFBTSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBQzlDLCtCQUFxQixDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDMUMsK0JBQXFCLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUN0RCxNQUFNLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFBLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQU8sRUFBRSxNQUFNLEVBQXVCO0lBQzNELE9BQU8sQ0FBTyxTQUE0QixFQUFFLEVBQUU7UUFDNUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM3QixNQUFNLEVBQUUsR0FBRyw4QkFBWSxDQUFDLDJCQUEyQixDQUFFLE1BQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pGLE1BQU0sRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEdBQUcsTUFBTSxFQUFFLEVBQUUsQ0FBQztRQUUvQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBa0UsRUFBRSxFQUFFO1lBQ3ZGLG1DQUFtQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQW1CLENBQUM7WUFDbkQsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFnQixFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNqRSwrQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQSxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQWdCLFlBQVksQ0FBSSxNQUErRDtJQUM3RixPQUFPLENBQU8sT0FBNEIsRUFBRSxPQUFZLEVBQUUsRUFBRTtRQUMxRCxPQUFPLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsMkJBQTJCLEdBQUcsMkJBQTJCLENBQU8sT0FBTyxDQUFDLENBQUM7UUFDakYsT0FBTyxDQUFDLGlCQUFpQixHQUFJLCtCQUFxQixDQUFDLGlCQUFpQixDQUFDO1FBQ3JFLE9BQU8sQ0FBQyxPQUFPLEdBQUksK0JBQXFCLENBQUMsUUFBUSxDQUFDO1FBQ2xELE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBUkQsb0NBUUMifQ==