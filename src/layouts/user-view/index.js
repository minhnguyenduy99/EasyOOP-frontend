export default ({
  name = "UserViewLayout",
  includeHero = true,
  menuBar = true,
  footer = true
} = {}) => ({
  name,
  components: () => ({
    header: () => import("./user-view.header"),
    ...(menuBar && { "menu-navbar": () => import("./user-view.menu-navbar") }),
    ...(footer && { footer: () => import("./user-view.footer") })
  }),
  layout: () => import("./layout"),
  props: {
    includeHero,
    menuBar,
    footer
  }
});
