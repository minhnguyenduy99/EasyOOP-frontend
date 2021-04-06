import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import { createVueRouter } from "./router";
import { createVuexStore } from "./store";
import { ApiService } from "./apis";
import { authHeaderInterceptor } from "./apis/interceptors";
import {
  FormValidatorPlugin,
  ApiServicePlugin,
  VueMarkdownPlugin
} from "./plugins";
import mockApiService from "./mocks";

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: "fas"
});
Vue.use(new FormValidatorPlugin());
Vue.use(VueMarkdownPlugin);
Vue.use(ApiServicePlugin, {
  apiService: mockApiService,
  key: "$api"
});

// Init API services
const apiServices = new ApiService({
  baseURL: process.env.VUE_APP_API_ENDPOINT
});
apiServices.useInterceptor(authHeaderInterceptor);

// Init vue store
const vuexStore = createVuexStore({ apiService: apiServices.apis });

// Init vue router
const vueRouterWrapper = createVueRouter();

new Vue({
  router: vueRouterWrapper.router,
  store: vuexStore,
  render: h => h(App)
}).$mount("#app");
