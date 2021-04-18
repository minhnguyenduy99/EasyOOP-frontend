export class APIPack {
  _apis;

  constructor() {
    this._apis = {};
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
  }
}
