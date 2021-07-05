export default () => ({
  name: "TestManagement",
  path: "tests",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: ["creator"]
    }
  }
});
