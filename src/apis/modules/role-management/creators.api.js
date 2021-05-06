/* eslint-disable no-undef */
import { BaseAPI } from "../../base";

const endpoints = {
  findCreators: "/search"
};

export class CreatorAPI extends BaseAPI {
  async findCreators(opts) {
    const {
      page = 1,
      alias = "",
      sort_order = "desc",
      sort_by = "created_date"
    } = opts;
    try {
      const endpoint = this._addURLParams(endpoints.findCreators, page);
      const response = await this._context.get(endpoint, {
        withCredentials: true,
        params: {
          alias,
          sort_order,
          sort_by
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      console.log(err);
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  getEndpointObject() {
    return {
      findCreators: this.findCreators.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
