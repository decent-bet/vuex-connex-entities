/* eslint-disable no-param-reassign */
import { ConnexService, CometService } from '@decent-bet/connex-entities';
import { ContractSetting } from '@decent-bet/connex-entities/types';
import { ActionContext } from 'vuex';


export const PREFIX: string = 'connex-entities';
const commitOptions = { root: true };


function requestExternalWalletAccess<S, R>({ commit }: ActionContext<S, R>) {
  return async () => {
    const { connex, thor } = <any>window;
    ConnexService.instance = connex;
    const rq = CometService.requestExternalWalletAccess(thor, connex);
    const { chainTag, publicAddress } = await rq();
    ConnexService.chainTag = chainTag;
    ConnexService.defaultAccount = publicAddress;
    commit(`${PREFIX}/EXTERNAL_WALLET_PERMISSION`, true, commitOptions);
  };
}

function setupContracts<S, R>({ commit }: ActionContext<S, R>) {
  return (contracts: ContractSetting[]) => {
    ConnexService.setupContracts(contracts);
    commit(`${PREFIX}/SET_ENTITIES_LOADED`, true, commitOptions);
  };
}

export function connexAction(action: <S, R>(context: ActionContext<S, R>, payload: any)=> any) {
  return <S, R>(context: ActionContext<S, R>, payload: any) => {
    context.setupContracts = setupContracts(context);
    context.requestExternalWalletAccess = requestExternalWalletAccess(context);
    context.$contractEntities = ConnexService.contractInstances;
    context.$connex = ConnexService.instance;
    return action(context, payload);
  };
}
