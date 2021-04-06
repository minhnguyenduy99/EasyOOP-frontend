import { BaseAPI } from "./base.api";

const endpoints = {
  search: "/search"
};

const TAG_TYPES = {
  post: "post",
  example: "example",
  question: "question"
}

export class TagAPI extends BaseAPI {
  async searchTags(options) {
    const { value = "", type } = options;
    try {
      const response = await this._context.get(endpoints.search, {
        params: { value, type }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async searchPostTags(value = "") {
    return this.searchTags({
      value,
      type: TAG_TYPES.post
    });
  }

  getEndpointObject() {
    return {
      searchTags: this.searchTags.bind(this),
      searchPostTags: this.searchPostTags.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
