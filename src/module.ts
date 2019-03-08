import { Module } from 'vuex';
import { connextEntitiesMutations } from './mutations';
import { IConnexEntitiesState, ConnexEntitiesDefaultState } from './state';

export const ConnextEntitiesModule: Module<IConnexEntitiesState, any> = {
  namespaced: true,
  state: {
    ...ConnexEntitiesDefaultState(),
  },
  mutations: {
    ...connextEntitiesMutations,
  }
};
