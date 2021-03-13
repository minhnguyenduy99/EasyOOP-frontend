import Vue from "vue";
import VueRouter from "vue-router";
import { VueRouterWrapper } from "./base";
import UserViewRoutes from "./user-view.route";
import AdminRoutes from "./admin.routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...UserViewRoutes, ...AdminRoutes]
});

export * from "./guards";

export function createVueRouter() {
  return new VueRouterWrapper(router);
}
