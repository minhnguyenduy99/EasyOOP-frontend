import axios from "axios";
import { BaseResponseFormatter } from "../helpers";

export class BaseAPI {
  _context;
  _endpoint;

  /**
   * @type {BaseResponseFormatter}
   */
  _formatter;

  /**
   * @param {String} endpoint
   * @param {{ endpoint: String }} options
   */
  constructor(endpoint = "", options = {}) {
    this._context = axios;
    this._endpoint = endpoint;
    this._initAPIEndpoints();
  }

  config({ endpoint, responseFormatter }) {
    this._endpoint = endpoint;
    this._formatter = responseFormatter;
    this._initAPIEndpoints();
  }

  getEndpointObject() {
    return {};
  }

  /**
   * @param {BaseResponseFormatter} formatter
   */
  useResponseFormatter(formatter) {
    this._formatter = formatter;
  }

  get endpoint() {
    return this._endpoint;
  }

  _prefixEndpoint(subEndpoints) {
    Object.keys(subEndpoints).forEach(key => {
      subEndpoints[key] = this._endpoint + subEndpoints[key];
    });
  }

  /**
   * Add url params to an existing url
   * @param {string} url
   * @param  {...string[]} values
   * @returns {string}
   */
  _addURLParams(url, ...values) {
    values.forEach(value => {
      url += `/${value}`;
    });
    return url;
  }

  _initAPIEndpoints() {}
}
