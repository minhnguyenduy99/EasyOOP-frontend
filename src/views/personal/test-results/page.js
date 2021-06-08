export default () => ({
  name: "PersonalTestResults",
  path: "test-results",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: "*"
    }
  }
});
