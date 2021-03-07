import { ResponseFormatter } from "./helpers";
import { InterceptorConfig } from "./interceptor.config";

export class ApiService {
  _apis;
  _baseURL;
  /**
   * @type {InterceptorConfig}
   */
  _interceptorConfig;

  /**
   * @param {{ bsaeURL: String }} options
   */
  constructor(options) {
    const { baseURL } = options;
    this._baseURL = baseURL;
    this._initApiService();
    this._interceptorConfig = new InterceptorConfig();
  }

  _initApiService() {
    this._apis = {};

    Object.keys(this._apis).forEach(endpoint => {
      const api = this._apis[endpoint];
      api.config({
        endpoint: `${this._baseURL}/${endpoint}`,
        responseFormatter: new ResponseFormatter()
      });
    });
  }

  useInterceptor(interceptorFactory, opts) {
    interceptorFactory(this._interceptorConfig, opts);
  }

  get apis() {
    return this._apis;
  }
}
