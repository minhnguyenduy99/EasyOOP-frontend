import { BaseAPI } from "../../base";

const endpoints = {
  searchTag: "/search",
  findTagById: "/byid",
  updateTag: "/byid",
  createTags: "/bulk"
};

export class TagAPI extends BaseAPI {
  async searchTag(opts) {
    const { value } = opts;
    try {
      const response = await this._context.get(endpoints.searchTag, {
        params: {
          value
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async createTags(opts) {
    const { type, tags } = opts;
    try {
      const response = await this._context.post(endpoints.createTags, {
        type,
        tags
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async findTagById(opts) {
    const { tag_id } = opts;
    const endpoint = this._addURLParams(endpoints.findTagById, tag_id);
    try {
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async updateTag(opts) {
    const { tag_id, tag } = opts;
    const endpoint = this._addURLParams(endpoints.updateTag, tag_id);
    try {
      const response = await this._context.put(endpoint, tag);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  getEndpointObject() {
    return {
      searchTag: this.searchTag.bind(this),
      findTagById: this.findTagById.bind(this),
      createTags: this.createTags.bind(this),
      updateTag: this.updateTag.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
