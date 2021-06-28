import { BaseAPI } from "../../base";

const endpoints = {
  searchTag: "/search",
  findTagById: "",
  updateTag: "",
  createTags: "/bulk",
  deleteTag: ""
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

  async deleteTag(opts) {
    const { tag_type, tag_id } = opts;
    const endpoint = this._addURLParams(endpoints.deleteTag, tag_type, tag_id);
    try {
      const response = await this._context.delete(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async findTagById(opts) {
    const { tag_id, tag_type } = opts;
    const endpoint = this._addURLParams(
      endpoints.findTagById,
      tag_type,
      tag_id
    );
    try {
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async updateTag(opts) {
    const { tag_id, tag_type, tag } = opts;
    const endpoint = this._addURLParams(endpoints.updateTag, tag_type, tag_id);
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
      updateTag: this.updateTag.bind(this),
      deleteTag: this.deleteTag.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
