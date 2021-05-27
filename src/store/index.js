import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "./persisted-state.plugin";
import {
  AuthModule,
  PostModule,
  CreatorModule,
  ManagerModule,
  UserModule,
  Q8AModule,
  TagModule,
  TestModule,
  ViewerTestModule
} from "./modules";

Vue.use(Vuex);

export const STORE_MODULES = {
  AUTH: "AUTH",
  POST: "POST",
  CREATOR: "CREATOR",
  MANAGER: "MANAGER",
  USER: "USER",
  TAG: "TAG",
  QANDA: "QANDA",
  TEST: "TEST",
  VIEWER_TEST: "VIEWER_TEST"
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
    plugins: [
      createPersistedState({
        paths: [STORE_MODULES.AUTH]
      })
    ],
    modules: {
      [STORE_MODULES.AUTH]: AuthModule(context),
      [STORE_MODULES.POST]: PostModule(context),
      [STORE_MODULES.CREATOR]: CreatorModule(context),
      [STORE_MODULES.MANAGER]: ManagerModule(context),
      [STORE_MODULES.USER]: UserModule(context),
      [STORE_MODULES.QANDA]: Q8AModule(context),
      [STORE_MODULES.TAG]: TagModule(context),
      [STORE_MODULES.TEST]: TestModule(context),
      [STORE_MODULES.VIEWER_TEST]: ViewerTestModule(context)
    }
  });
}
