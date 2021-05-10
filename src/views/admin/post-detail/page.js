export default () => ({
  name: "AdminPostDetail",
  path: "posts/:post_id",
  page: () => import("./page.vue"),
  props: {
    default: route => ({ postId: route.params.post_id })
  },
  meta: {
    auth: {
      requires: true,
      roles: ["manager", "creator"]
    }
  }
});
