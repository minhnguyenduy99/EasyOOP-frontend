export default class VueRouterWrapper {
  _router;

  constructor(router) {
    this._router = router;
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
