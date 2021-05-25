export default () => ({
  name: "EditTest",
  path: "tests/edit/:test_id",
  page: () => import("./page.vue"),
  props: {
    default: route => ({ testId: route.params.test_id })
  },
  meta: {
    auth: {
      requires: true,
      roles: ["creator"]
    }
  }
});
