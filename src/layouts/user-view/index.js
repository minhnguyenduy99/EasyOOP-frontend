export default ({
  name = "UserViewLayout",
  includeHero = true,
  footer = true
} = {}) => ({
  name,
  components: () => ({
    header: () => import("./user-view.header"),
    ...(footer && { footer: () => import("./user-view.footer") })
  }),
  layout: () => import("./layout"),
  props: route => {
    const { layout = {} } = route.meta;
    const { headerTransition = false, paddingless = false } = layout;
    return {
      includeHero,
      footer,
      headerTransition,
      paddingless
    };
  }
});
