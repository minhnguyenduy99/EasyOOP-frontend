const DEFAULT_PLUGIN_KEY = "apiservice";

export const ApiServicePlugin = {
  install: (Vue, options) => {
    const { apiService, key = DEFAULT_PLUGIN_KEY } = options;
    Vue.prototype[key] = apiService;
  }
};
