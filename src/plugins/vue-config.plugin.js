export default {
  install(Vue, options = {}) {
    const { key = "$appConfig" } = options;
    Vue.prototype[key] = {
      HOST: process.env.VUE_APP_HOST
    };
  }
};
