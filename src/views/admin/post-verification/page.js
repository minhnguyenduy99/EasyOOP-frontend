export default () => ({
  name: "PostVerification",
  path: "verifications",
  page: () => import("./page.vue"),
  meta: {
    role: ["user"]
  }
});
