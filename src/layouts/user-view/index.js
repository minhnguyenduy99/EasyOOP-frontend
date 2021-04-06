export default () => ({
  name: "UserViewLayout",
  components: () => ({
    header: () => import("./user-view.header"),
    sidebar: () => import("./user-view.sidebar"),
    "menu-navbar": () => import("./user-view.menu-navbar"),
    footer: () => import("./user-view.footer")
  }),
  layout: () => import("./layout"),
  props: {
    includeHero: true
  }
});
