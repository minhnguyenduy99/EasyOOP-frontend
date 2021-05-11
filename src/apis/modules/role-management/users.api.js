/* eslint-disable no-undef */
import { BaseAPI } from "../../base";

const endpoints = {
  searchById: "/search"
};

export class UserAPI extends BaseAPI {
  async searchById(opts) {
    const { user_id } = opts;
    try {
      const endpoint = this._addURLParams(endpoints.searchById, user_id);
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      console.log(err);
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  getEndpointObject() {
    return {
      searchById: this.searchById.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
