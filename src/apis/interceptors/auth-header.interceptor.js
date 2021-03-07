import { InterceptorConfig } from "../interceptor.config";

/**
 * @param {InterceptorConfig} interceptorConfig
 */
export default interceptorConfig => {
  interceptorConfig.addRequestInterceptor(config => {
    config.withCredentials = true;
    return config;
  });
};
