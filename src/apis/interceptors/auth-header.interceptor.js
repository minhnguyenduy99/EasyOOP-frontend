export default interceptorConfig => {
  interceptorConfig.addRequestInterceptor(config => {
    config.withCredentials = true;
    return config;
  });
};
