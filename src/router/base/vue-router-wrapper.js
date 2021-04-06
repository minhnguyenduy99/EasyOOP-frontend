import VueRouter from "vue-router";

export default class VueRouterWrapper {
  /**
   * @type {VueRouter}
   */
  _router;

  constructor(router) {
    this._router = router;
  }

  addLayout(path, layoutConfigResolver, pageConfigs) {
    const { layout, components: componentsResolver, ...routeConfig } =
      layoutConfigResolver?.() ?? layoutConfigResolver;
    this._router.addRoute({
      path,
      component: layout,
      ...routeConfig,
      children: pageConfigs.map(pageConfigResolver =>
        this.loadPage(componentsResolver, pageConfigResolver)
      )
    });

    return this;
  }

  loadPage(componentsResolver, pageConfigResolver) {
    let { page, ...pageConfig } = pageConfigResolver?.() ?? pageConfigResolver;
    let components = componentsResolver?.() ?? componentsResolver;
    return {
      components: {
        default: page,
        ...components
      },
      ...pageConfig
    };
  }

  addRoutes(routes) {
    this._router.addRoutes(routes);
    return this;
  }

  addGuard(guardFactory, opts) {
    guardFactory?.(this._router, opts);
    return this;
  }

  get router() {
    return this._router;
  }
}
