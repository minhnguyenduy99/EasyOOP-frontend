import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import Buefy from "buefy";
import config from "../config/app-config.json";
import App from "./App.vue";
import { createVueRouter } from "./router";
import { createVuexStore } from "./store";
import createAPIPack from "./apis";
import {
  FormValidatorPlugin,
  ApiServicePlugin,
  VueMarkdownPlugin,
  AOSPlugin,
  VueAppConfigPlugin
} from "./plugins";
import mockApiService from "./mocks";

console.log("App is running in " + process.env.NODE_ENV);
const appConfig = config[process.env.NODE_ENV || "development"];

Vue.config.productionTip = false;

Vue.use(VueAppConfigPlugin);
Vue.use(VueCompositionAPI);
Vue.use(Buefy, {
  defaultIconPack: "fas"
});
Vue.use(AOSPlugin);
Vue.use(new FormValidatorPlugin());
Vue.use(VueMarkdownPlugin);
Vue.use(ApiServicePlugin, {
  apiService: mockApiService,
  key: "$api"
});

// Init API services
const apiPack = createAPIPack({
  baseURL: appConfig.VUE_APP_API_ENDPOINT
});
// Init vue store
const vuexStore = createVuexStore({ apiService: apiPack.apis });

// Init vue router
const vueRouterWrapper = createVueRouter({ store: vuexStore });

new Vue({
  router: vueRouterWrapper.router,
  store: vuexStore,
  render: h => h(App)
}).$mount("#app");
