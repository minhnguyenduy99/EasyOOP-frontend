export default () => ({
  name: "Q&A",
  path: "qanda",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: ["manager", "creator", "admin"]
    }
  }
});
