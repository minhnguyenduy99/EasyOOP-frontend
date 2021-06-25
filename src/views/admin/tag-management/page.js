export default () => ({
  name: "TagManagementPage",
  path: "tags",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: ["manager", "admin"]
    }
  }
});
