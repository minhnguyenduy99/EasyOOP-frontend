import Vue from "vue";
import VueRouter from "vue-router";
import { VueRouterWrapper } from "./base";
import UserViewRoutes from "./user-view.route";
import AdminRoutes from "./admin.routes";
import { authGuard } from "./guards";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => {
    if (VueRouter.isNavigationFailure(err)) {
      console.log(err);
      // resolve err
      return err;
    }
    // rethrow error
    return Promise.reject(err);
  });
};

Vue.use(VueRouter);

export function createVueRouter(opts) {
  const { store } = opts;
  const vueRouter = new VueRouterWrapper(
    new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      // routes: [...UserViewRoutes, ...AdminRoutes],
      scrollBehavior(to, from, savedPosition) {
        return {
          selector: "body",
          behavior: "smooth"
        };
      }
    })
  );

  vueRouter.addGuard(authGuard, { store });

  UserViewRoutes(vueRouter);
  AdminRoutes(vueRouter);

  return vueRouter;
}
