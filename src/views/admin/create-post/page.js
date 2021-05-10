export default () => ({
  name: "CreatePost",
  path: "create-post",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: ["creator"]
    }
  }
});
