export default () => ({
  name: "AdminAccountInfo",
  path: "account",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: ["manager", "creator", "admin"]
    }
  }
});
