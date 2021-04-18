export default () => ({
  name: "PendingPosts",
  path: "posts/pending",
  page: () => import("./page.vue"),
  meta: {
    role: ["user"]
  }
});
