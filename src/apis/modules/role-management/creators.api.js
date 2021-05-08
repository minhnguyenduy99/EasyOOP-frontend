/* eslint-disable no-undef */
import { BaseAPI } from "../../base";

const endpoints = {
  findCreators: "/search",
  findById: "",
  updateCreator: ""
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

  async getCreatorById(opts) {
    const { creator_id } = opts;
    const endpoint = this._addURLParams(endpoints.findById, creator_id);
    try {
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async updateCreator(opts) {
    const { creator_id, form } = opts;
    const endpoint = this._addURLParams(endpoints.updateCreator, creator_id);
    try {
      const response = await this._context.put(endpoint, form, {
        withCredentials: true
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  getEndpointObject() {
    return {
      findCreators: this.findCreators.bind(this),
      updateCreator: this.updateCreator.bind(this),
      getCreatorById: this.getCreatorById.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
