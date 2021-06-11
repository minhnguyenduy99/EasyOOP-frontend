import { BaseAPI } from "../../../base";

const endpoints = {
  getPostById: ""
};

export class ManagerPostAPI extends BaseAPI {
  async getPostById(opts) {
    const { post_id, active = true } = opts;
    const endpoint = this._addURLParams(endpoints.getPostById, post_id);
    try {
      const response = await this._context.get(endpoint, {
        params: {
          active
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  getEndpointObject() {
    return {
      getPostById: this.getPostById.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
