export default () => ({
  name: "CreateTest",
  path: "tests/create",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: ["creator"]
    }
  }
});
