import Vue from 'vue';
import Vuex, { ActionContext, Store } from 'vuex';
import {
    connexAction,
    connexEntitiesMutations,
} from '../src';
import { TestContract1 } from './test-contracts/TestContract1';
import { TestContract2 } from './test-contracts/TestContract2';
import { TestContract3 } from './test-contracts/TestContract3';

interface RootState {
    [key: string]: any;
    account?: AccountState;
}

interface AccountState {
    info: any;
}

const state: RootState = {
    account: {
        info: null
    }
};

let store: Store<RootState>;

beforeEach(() => {
  Vue.use(Vuex);

  store = new Vuex.Store({
    state,
    actions: {
        // tslint:disable-next-line:no-shadowed-variable
        setupConnex: connexAction<Promise<void>>(async <AccountState, RootState>(
            context: ActionContext<AccountState, RootState>
          ) => {
            const {
              requestExternalWalletAccess
            } = context;
            await requestExternalWalletAccess();
        }),
         // tslint:disable-next-line:no-shadowed-variable
        testContract: connexAction<Promise<void>>(async <AccountState, RootState>(
            context: ActionContext<AccountState, RootState>
          ) => {
            const {
              commit, getContract
            } = context;
            const testContract1 = getContract(TestContract1);
            const testContract2 = getContract(TestContract2);
            const testContract3 = getContract(TestContract3);
        })
    },
    mutations: connexEntitiesMutations,
  });
});

// test('propagates the returns', async (t) => {
//   t.is(await t.context.store.dispatch('give'), true);
// });

describe('Vuex Connex Entities', () => {
    describe('#connexAction', () => {
        // TODO: add its
    });
});
