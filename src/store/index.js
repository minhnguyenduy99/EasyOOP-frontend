import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "./persisted-state.plugin";
import {
  AuthModule,
  PostModule,
  CreatorModule,
  ManagerModule
} from "./modules";

Vue.use(Vuex);

export const STORE_MODULES = {
  AUTH: "AUTH",
  POST: "POST",
  CREATOR: "CREATOR",
  MANAGER: "MANAGER"
};

export function createVuexStore(context) {
  return new Vuex.Store({
    state: {
      currentView: ""
    },
    mutations: {
      setCurrentView(state, data) {
        state.currentView = data;
      }
    },
    getters: {
      appCurrentView(state) {
        return state.currentView;
      }
    },
    plugins: [createPersistedState({ path: STORE_MODULES.AUTH })],
    modules: {
      [STORE_MODULES.AUTH]: AuthModule(context),
      [STORE_MODULES.POST]: PostModule(context),
      [STORE_MODULES.CREATOR]: CreatorModule(context),
      [STORE_MODULES.MANAGER]: ManagerModule(context)
    }
  });
}
