import { ResponseFormatter } from "../helpers";
import { InterceptorConfig } from "./interceptor.config";

export class BaseAPIModule {
  _apis;

  _baseURL;
  /**
   * @type {InterceptorConfig}
   */
  _interceptorConfig;

  _responseFormatter;

  /**
   * @param {{ name: String, baseURL: String }} options
   */
  constructor(options) {
    const { name = "", baseURL } = options;
    this._name = name;
    this._baseURL = baseURL;
    this._responseFormatter = new ResponseFormatter();
    this._initModule();
    this._interceptorConfig = new InterceptorConfig();
  }

  get apis() {
    return this._apis;
  }

  get moduleName() {
    return this._name;
  }

  useInterceptor(interceptorFactory, opts) {
    interceptorFactory(this._interceptorConfig, opts);
  }

  _mergeWithService(apiService) {
    this._apis = {
      ...this._apis,
      ...apiService.apis
    };
  }

  _useAPI(api, endpoint, alias = null) {
    api.config({
      endpoint: `${this._baseURL}/${endpoint}`,
      responseFormatter: this._responseFormatter
    });
    let apis = api.getEndpointObject();
    Object.keys(apis).forEach(endpointKey => {
      let key = alias ? `${alias}_${endpointKey}` : endpointKey;
      this._apis[key] = apis[endpointKey];
    });
  }

  _initModule() {}
}
