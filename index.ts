/* eslint-disable no-param-reassign */
import { ConnexService } from '@decent-bet/connex-entities';
import { CometService } from '@decent-bet/connex-entities';
import _Vue from 'vue';

export function ConnexEntityContract(Vue: typeof _Vue, options?: any): void {
  Vue.prototype.$contractEntities = {};
  if (options.entities) {
    options.entities.forEach((i: { name: string | number; contract: new () => void; }) => {
      // eslint-disable-next-line new-cap
      Vue.prototype.$contractEntities[i.name] = new i.contract();
    });
  }

  Vue.prototype.$requestExternalWalletAccess = async () => {
    if ((process as any).browser) {
      ConnexService.instance = window.connex;
      const rq = CometService.requestExternalWalletAccess((window as any).thor, window.connex);
      const { chainTag, publicAddress } = await rq();
      ConnexService.chainTag = chainTag;
      ConnexService.defaultAccount = publicAddress;

      Vue.prototype.$connex = ConnexService;
    }
  };
}
