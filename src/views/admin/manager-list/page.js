export default () => ({
  name: "ListManagerPage",
  path: "managers",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: ["admin"]
    }
  }
});
