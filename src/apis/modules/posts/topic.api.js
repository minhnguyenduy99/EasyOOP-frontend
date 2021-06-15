import { BaseAPI } from "../../base";

const endpoints = {
  search: "/search",
  getAllTopics: "/all"
};

export class TopicAPI extends BaseAPI {
  async searchTopics(options = {}) {
    const { k = "", start = 0, limit = 100 } = options;
    try {
      const response = await this._context.get(endpoints.search, {
        params: { k, start, limit }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async getAllTopics() {
    try {
      const response = await this._context.get(endpoints.getAllTopics);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  getEndpointObject() {
    return {
      searchTopics: this.searchTopics.bind(this),
      getAllTopics: this.getAllTopics.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
