import { ResponseFormatter } from "./helpers";
import { InterceptorConfig } from "./interceptor.config";
import { PostAPI } from "./posts.api";
import { TagAPI } from "./tag.api";
import { TopicAPI } from "./topic.api";

export class ApiService {
  _apis;
  _baseURL;
  /**
   * @type {InterceptorConfig}
   */
  _interceptorConfig;

  _responseFormatter;

  /**
   * @param {{ bsaeURL: String }} options
   */
  constructor(options) {
    const { baseURL } = options;
    this._baseURL = baseURL;
    this._responseFormatter = new ResponseFormatter();
    this._initApiService();
    this._interceptorConfig = new InterceptorConfig();
  }

  _initApiService() {
    this._apis = {};
    this._useAPI(new PostAPI(), "posts");
    this._useAPI(new TagAPI(), "tags");
    this._useAPI(new TopicAPI(), "topics");
  }

  useInterceptor(interceptorFactory, opts) {
    interceptorFactory(this._interceptorConfig, opts);
  }

  get apis() {
    return this._apis;
  }

  _useAPI(api, endpoint) {
    api.config({
      endpoint: `${this._baseURL}/${endpoint}`,
      responseFormatter: this._responseFormatter
    });
    this._apis[endpoint] = api.getEndpointObject();
  }
}
