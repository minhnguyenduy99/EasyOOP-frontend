import axios from "axios";

export class InterceptorConfig {
  addRequestInterceptor(handler, errorHandler = null) {
    return axios.interceptors.request.use(handler, errorHandler);
  }

  removeRequestInterceptor(interceptor) {
    axios.interceptors.request.eject(interceptor);
  }

  addResponseInterceptor(handler, errorHandler = null) {
    return axios.interceptors.response.use(handler, errorHandler);
  }

  removeResponsetInterceptor(interceptor) {
    axios.interceptors.response.eject(interceptor);
  }
}
