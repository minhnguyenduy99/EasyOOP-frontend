import config from "../../config/app-config.json";

export const APP_CONFIG = config[process.env.NODE_ENV || "development"];
