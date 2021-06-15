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
    const { requires = false, roles = "*", redirectIfNotAuth = "Home" } =
      to.meta.auth ?? {};
    if (!requires) {
      next();
      return;
    }
    const { data, error } = await store.dispatch("AUTH/relogin");
    if (error) {
      next({ name: redirectIfNotAuth });
      return;
    }
    const { active_role } = data;
    if (isRoleAllow(active_role, roles)) {
      next();
      return;
    }
    next({ name: getDefaultRouteOfRole(active_role) });
  });
};

function isRoleAllow(activeRole, roles) {
  return activeRole && (roles === "*" || roles.indexOf(activeRole) > -1);
}

function getDefaultRouteOfRole(role) {
  switch (role) {
    case "creator":
      return "ListPosts";
    case "manager":
      return "PostVerification";
    case "admin":
      return "ListManagerPage";
  }
  return "Home";
}
