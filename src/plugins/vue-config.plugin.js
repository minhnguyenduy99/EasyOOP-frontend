export default {
  install(Vue, options = {}) {
    const { key = "$appConfig" } = options;
    const appConfig = process.env;
    Vue.prototype[key] = appConfig;
  }
};
