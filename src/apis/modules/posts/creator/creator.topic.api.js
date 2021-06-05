import { BaseAPI } from "@/apis/base";

const endpoints = {
  getAvailableTopics: "/search/available"
};

export class CreatorTopicAPI extends BaseAPI {
  async getAvailableTopics(opts) {
    const { k = "", start = 0, limit = 100 } = opts;
    try {
      const response = await this._context.get(endpoints.getAvailableTopics, {
        params: { k, start, limit }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  getEndpointObject() {
    return {
      getAvailableTopics: this.getAvailableTopics.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
