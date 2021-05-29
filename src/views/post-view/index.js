export default () => ({
  name: "PostView",
  path: "posts/:post_id",
  page: () => import("./page"),
  props: {
    default: route => ({ postId: route.params.post_id })
  },
  meta: {
    layout: {
      headerTransition: true
    }
  }
});
