export class APIPack {
  _apis;

  _modules;

  constructor() {
    this._apis = {};
    this._modules = {};
  }

  get apis() {
    return this._apis;
  }

  registerMany(...listOptions) {
    listOptions = listOptions ?? [];
    listOptions.forEach(options => {
      this.register(options);
    });
  }

  register(apiModule) {
    const { apis, moduleName } = apiModule;
    this._apis[moduleName] = apis;
    this._modules[moduleName] = apiModule;
  }

  useInterceptors(interceptorFactory, opts = null) {
    Object.values(this._modules).forEach(module => {
      module.useInterceptor(interceptorFactory, opts);
    });
  }
}
