import { BaseAPI } from "../../base";

const endpoints = {
  searchTag: "/search"
};

export class TagAPI extends BaseAPI {
  async searchTag(opts) {
    const { page, type, used, value } = opts;
    try {
      const response = await this._context.get(endpoints.searchTag, {
        params: {
          page,
          type,
          used,
          value
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  getEndpointObject() {
    return {
      searchTag: this.searchTag.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
