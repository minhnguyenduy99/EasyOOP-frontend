export default () => ({
  name: "ListPosts",
  path: "posts",
  page: () => import("./page.vue"),
  meta: {
    auth: {
      requires: true,
      roles: ["creator"]
    }
  }
});
