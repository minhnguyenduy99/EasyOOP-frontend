export default () => ({
  name: "AdminLayout",
  components: () => ({
    sidebar: () => import("./admin-sidebar/admin-sidebar.vue")
  }),
  layout: () => import("./layout")
});
