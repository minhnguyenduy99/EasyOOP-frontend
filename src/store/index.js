import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "./persisted-state.plugin";
import { AuthModule, PostModule, TagModule, TopicModule } from "./modules";

Vue.use(Vuex);

export const STORE_MODULES = {
  AUTH: "AUTH",
  POST: "POST",
  TOPIC: "TOPIC",
  TAG: "TAG"
};

export function createVuexStore(context) {
  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    plugins: [createPersistedState({ path: STORE_MODULES.AUTH })],
    modules: {
      [STORE_MODULES.AUTH]: AuthModule(context),
      [STORE_MODULES.POST]: PostModule(context),
      [STORE_MODULES.TAG]: TagModule(context),
      [STORE_MODULES.TOPIC]: TopicModule(context)
    }
  });
}
