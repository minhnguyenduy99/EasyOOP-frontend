export default () => ({
  name: "PendingPosts",
  path: "posts/pending",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: ["creator"]
    }
  }
});
