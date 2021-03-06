import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import Buefy from "buefy";
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
import VueMeta from "vue-meta";

console.log("App is running in " + process.env.NODE_ENV);

Vue.config.productionTip = false;

Vue.use(VueMeta);
Vue.use(VueAppConfigPlugin);
Vue.use(VueCompositionAPI);
Vue.use(Buefy, {
  defaultIconPack: "fas"
});
Vue.use(AOSPlugin);
Vue.use(new FormValidatorPlugin());
Vue.use(VueMarkdownPlugin);

// Init API services
const apiPack = createAPIPack({
  baseURL: process.env.VUE_APP_API_ENDPOINT
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
