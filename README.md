### Vuex Connex Entities

Vuex Connex Entities allows to add [@decent-bet/connex-entities](https://github.com/decent-bet/connex-entities) capabilities to vuex. It consist for now in an enhanced action that add three new parameters to every action created based on it. 

- `getContract()`: return a contract instance of a class based on [@decent-bet/connex-entities](https://github.com/decent-bet/connex-entities).
- `requestExternalWalletAccess()`: request access to an external wallet.
- `walletInfo`: an object that store the public address and the current chain tag, check the interface [WalletInfo](/src/types.ts#L1).

#### Getting started

> Install: `npm i --save @decent-bet/vuex-connex-entities`
> Follow the instructions to setup a contract with [@decent-bet/connex-entities](https://github.com/decent-bet/connex-entities#api).


### Using the enhanced action
> Frist of all you need to add some mutations to your store or module of your store:
``` typescript
  import { connexEntitiesMutations } from '@decent-bet/vuex-connex-entities';

  ...
   mutations: {
     // your mutations
     ...connexEntitiesMutations
   },
   ...
```

> Get the wallet access:
***You should call `requestExternalWalletAccess()` before any access to `walletInfo` or call to `getContract()`***
``` typescript
import { ActionContext } from 'vuex';
import { connexAction } from '@decent-bet/vuex-connex-entities';
import { MySubState } from './MySubState'; // use your own state definitions
import { MyRootState } from '../MyRootState'; // use your own state definitions
import { MyConnexEntityContract } from '../MyConnexEntityContract';  // created using @decent-bet/connex-entities.

// the connexAction receive a type of the return, in this case Promise<void>, 
// the second param is a function and can be awaitable like in this case  
const getWalletAccess = connexAction<Promise<void>>(async <MySubState, MyRootState>(
  context: ActionContext<MySubState, MyRootState>) => {
  const {
    commit,
    requestExternalWalletAccess
  } = context;
  const result: boolean = await requestExternalWalletAccess();

  if (result) {
      // the user allowed the wallet access
  } else {
      // the user not confirm or not has the installed extension
  }

  commit('WALLET_ACCESS_ACTION', result);
});
```

> Access to the wallet info:
``` typescript
// get the wallet info, you only be able to access the walletInfo after call to requestExternalWalletAccess() method
const setupWappet = connexAction<Promise<void>>(<MySubState, MyRootState>(
  context: ActionContext<MySubState, MyRootState>, balance?: any
) => {
  const {
    commit,
    walletInfo // WalletInfo
  } = context;

  // access to the public address and the chain tag
  const { publicAddress, chainTag } = walletInfo;
  console.log(`My address is: ${publicAddress} and the chainTag is: ${chainTag}`);
  commit('SETUP_WALLET_ACTION', walletInfo);
});
```

> Get an entity contract and call to a method:
``` typescript
// get any created contract based on @decent-bet/connex-entities
const getBalance = connexAction<Promise<void>>(async <MySubState, MyRootState>(
  context: ActionContext<MySubState, MyRootState>, balance?: any
) => {
  const {
    commit,
    getContract
  } = context;
  // get the class instace of MyConnexEntityContract class
  const contract = getContract(MyConnexEntityContract);
  const balance = await contract.myBalance();

  commit('GET_BALANCE_ACTION', balance);
});

```

