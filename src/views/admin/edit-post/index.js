export default () => ({
  name: "EditPost",
  path: "post-edit/:post_id",
  page: () => import("./page"),
  props: {
    default: route => ({ postId: route.params.post_id })
  }
});
