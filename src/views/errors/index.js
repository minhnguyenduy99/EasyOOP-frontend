export default [
  () => ({
    name: "PageNotFound",
    path: "404",
    page: () => import("./not-found.page.vue"),
    meta: {
      auth: {
        requires: false
      },
      layout: {
        paddingless: true
      }
    }
  })
];
