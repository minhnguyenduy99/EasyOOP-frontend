export default () => ({
  name: "PersonalAccountInfo",
  path: "profile",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: "*"
    }
  }
});
