export default () => ({
  name: "CreatorManagement",
  path: "creators",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: ["manager", "admin"]
    }
  }
});
