import VueRouter from "vue-router";

/**
 * @param {VueRouter} router
 */
export default (router, opts = {}) => {
  const { store } = opts;
  if (!store) {
    return;
  }
  router.beforeEach(async (to, from, next) => {
    const record =
      to.matched.filter(route => route.meta.name === "AuthMeta")?.[0] ?? to;
    const { requires = false, roles = [], redirectIfNotAuth = "Home" } =
      record.meta.auth ?? {};
    const { data, error } = await store.dispatch("AUTH/relogin");
    if (!requires) {
      next();
      return;
    }
    if (error) {
      next({ name: redirectIfNotAuth });
      return;
    }
    const { active_role } = data;
    if (isRoleAllow(active_role, roles)) {
      next();
      return;
    }
    next({ name: redirectIfNotAuth });
  });
};

function isRoleAllow(activeRole, roles) {
  return roles.indexOf(activeRole) > -1;
}
