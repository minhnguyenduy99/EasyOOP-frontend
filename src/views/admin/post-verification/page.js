export default () => ({
  name: "PostVerification",
  path: "verifications",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: ["manager"]
    }
  }
});
