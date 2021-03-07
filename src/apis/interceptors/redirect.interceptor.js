export default (interceptorConfig, opts) => {
  const { errorCodes = [], redirectHandler, resetStateHandler = null } = opts;
  interceptorConfig?.addResponseInterceptor(
    response => response,
    async error => {
      console.log(error);
      const status = error.response.status;
      if (!errorCodes.includes(status)) {
        return Promise.reject(error);
      }
      await Promise.resolve(resetStateHandler?.());
      redirectHandler();
      return Promise.reject(error);
    }
  );
};
