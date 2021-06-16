import config from "../../config/app-config.json";

export default {
  install(Vue, options = {}) {
    const { key = "$appConfig" } = options;
    const env = process.env.NODE_ENV || "development";
    const appConfig = config[env];
    Vue.prototype[key] = appConfig;
  }
};
