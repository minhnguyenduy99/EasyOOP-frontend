import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "./persisted-state.plugin";

Vue.use(Vuex);

export const MODULES = {
  AUTH: "AUTH"
};

export function createVuexStore(options) {
  const { apiServices } = options;
  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    plugins: [createPersistedState({ path: MODULES.AUTH })]
  });
}
