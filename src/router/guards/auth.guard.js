import VueRouter from "vue-router";
import { MODULES } from "../../store";

/**
 * @param {VueRouter} router
 */
export default (router, opts = {}) => {
  const { store } = opts;
  if (!store) {
    return;
  }
  router.beforeEach((to, from, next) => {
    const record =
      to.matched.filter(route => route.meta.name === "AuthMeta")?.[0] ?? to;
    const { requiresAuth, redirectIfAuth, redirectIfNotAuth } = record.meta;
    const isAuthenticated =
      store.getters?.[`${MODULES.AUTH}/isAuthenticated`] ?? false;
    if (requiresAuth) {
      if (isAuthenticated) {
        next();
      } else {
        next(redirectIfNotAuth);
      }
    } else {
      if (isAuthenticated) {
        next(redirectIfAuth);
      } else {
        next();
      }
    }
  });
};
