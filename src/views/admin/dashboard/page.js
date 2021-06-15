export default () => ({
  name: "Dashboard",
  path: "dashboard",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: []
    }
  }
});
