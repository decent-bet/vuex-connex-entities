### Vuex Connex Entities

Vuex Connex Entities allows to add [@decent-bet/connex-entities](https://github.com/decent-bet/connex-entities) capabilities to vuex. It consist for now in an enhanced action that add two new parameters to every action created based on it. 

- `getContract()`: return a contract instance of a class based on [@decent-bet/connex-entities](https://github.com/decent-bet/connex-entities).
- `requestExternalWalletAccess()`: request access to an external wallet.

#### Getting started

> Install: `npm i --save @decent-bet/vuex-connex-entities`
> Follow the instructions to setup a contract with [@decent-bet/connex-entities](https://github.com/decent-bet/connex-entities#api).


### Using the enhanced action

``` typescript
import { ActionContext } from 'vuex';
import { connexAction } from '@decent-bet/vuex-connex-entities';
import { MySubState } from './MySubState'; // use your own state definitions
import { MyRootState } from '../MyRootState'; // use your own state definitions
import { MyConnexEntityContract } from '../MyConnexEntityContract';  // created using @decent-bet/connex-entities.

// the connexAction receive a type of the return, in this case Promise<void>, 
// the second parand is a function and can be awaitable like in this case  

const getWalletAccess = connexAction<Promise<void>>(async <MySubState, MyRootState>(
  context: ActionContext<MySubState, MyRootState>) => {
  const {
    commit,
    requestExternalWalletAccess
  } = context;
  // get the class instace of MyConnexEntityContract class
  const contract = getContract(MyConnexEntityContract);
  const result: boolean = await requestExternalWalletAccess();

  if (result) {
      // the user allowed the wallet access
  } else {
      // the user not confirm or not has the installed extension
  }

  commit('WALLET_ACCESS_ACTION', result);
});


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

