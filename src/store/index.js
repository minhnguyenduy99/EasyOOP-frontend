import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "./persisted-state.plugin";
import { AuthModule } from "./modules";

Vue.use(Vuex);

export const STORE_MODULES = {
  AUTH: "AUTH"
};

export function createVuexStore(context) {
  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    plugins: [createPersistedState({ path: STORE_MODULES.AUTH })],
    modules: {
      [STORE_MODULES.AUTH]: AuthModule(context)
    }
  });
}
