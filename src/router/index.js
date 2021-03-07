import Vue from "vue";
import VueRouter from "vue-router";
import { EmptyLayout } from "../layouts";
import { AboutPage, HomePage } from "../views";
import { VueRouterWrapper } from "./base";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "EmptyLayoutPages",
      component: EmptyLayout,
      path: "/",
      children: [
        {
          name: "Home",
          path: "/",
          components: {
            default: HomePage
          }
        },
        {
          name: "About",
          path: "/about",
          components: {
            default: AboutPage
          }
        }
      ]
    }
  ]
});

export * from "./guards";

export function createVueRouter() {
  return new VueRouterWrapper(router);
}
