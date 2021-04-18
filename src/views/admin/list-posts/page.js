export default () => ({
  name: "ListPosts",
  path: "posts",
  page: () => import("./page.vue")
});
