import Vue from 'vue'; 

declare module 'vue/types/vue'  {
  interface Vue {
   // ConnexEntityContract
    $connex: any;
    $contractEntities: any;
    $requestExternalWalletAccess: () => Promise<void>;
  }
}

export * from './index';
