import axios from "axios";
import { BaseResponseFormatter } from "./helpers";

export class BaseAPI {
  _context;
  _endpoint;

  /**
   * @type {BaseResponseFormatter}
   */
  _responseFormatter;

  /**
   * @param {String} endpoint
   * @param {{ endpoint: String }} options
   */
  constructor(endpoint = "", options = {}) {
    this._context = axios;
    this._endpoint = endpoint;
  }

  config({ endpoint, responseFormatter }) {
    this._endpoint = endpoint;
    this._responseFormatter = responseFormatter;
  }

  /**
   * @param {BaseResponseFormatter} formatter
   */
  useResponseFormatter(formatter) {
    this._responseFormatter = formatter;
  }

  get endpoint() {
    return this._endpoint;
  }
}
