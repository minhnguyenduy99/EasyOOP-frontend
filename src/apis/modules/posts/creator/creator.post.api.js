import { BaseAPI } from "@/apis/base";
import { createFile, HTTP_CODES, createForm } from "@/apis/helpers";

const endpoints = {
  createPost: "",
  deletePost: "",
  updatePost: "",
  updatePendingPost: "/pending",
  findPosts: "/search"
};

export class CreatorPostAPI extends BaseAPI {
  async createPost(data) {
    data.post_type = "series";
    data.content_file = createFile(data.content_file, { type: "text/plain" });
    data.tags = JSON.stringify(data.tags);
    data.templates = JSON.stringify(data.templates);
    data.previous_post_id ?? delete data.previous_post_id;
    const formData = createForm(data);
    try {
      const response = await this._context.post(endpoints.createPost, formData);
      if (response.status === HTTP_CODES.CREATED) {
        return this._formatter.getDataFormat(response);
      }
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async findPosts(options) {
    const {
      page = 1,
      searchOptions: {
        post_status = "0",
        search = "",
        sort_by = "created_date",
        sort_order = "asc",
        topic_id = null
      }
    } = options;
    const endpoint = this._addURLParams(endpoints.findPosts, page);
    try {
      const response = await this._context.get(endpoint, {
        params: { search, sort_by, sort_order, topic_id, post_status }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async deletePost(postId) {
    const endpoint = this._addURLParams(endpoints.deletePost, postId);
    try {
      const response = await this._context.delete(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async updatePost(options) {
    const { postId, data } = options;
    data.post_type = "series";
    data.content_file = createFile(data.content_file, { type: "text/plain" });
    data.tags = JSON.stringify(data.tags);
    data.templates = JSON.stringify(data.templates);
    data.previous_post_id ?? delete data.previous_post_id;
    const formData = createForm(data);
    const endpoint = this._addURLParams(endpoints.updatePost, postId);
    try {
      const response = await this._context.put(endpoint, formData);
      if (response.status === HTTP_CODES.OK) {
        return this._formatter.getDataFormat(response);
      }
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async updatePendingPost(options) {
    const { postId, data } = options;
    data.post_type = "series";
    data.content_file = createFile(data.content_file, { type: "text/plain" });
    const formData = createForm(data);
    const endpoint = this._addURLParams(endpoints.updatePendingPost, postId);
    try {
      const response = await this._context.put(endpoint, formData);
      if (response.status === HTTP_CODES.OK) {
        return this._formatter.getDataFormat(response);
      }
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  getEndpointObject() {
    return {
      createPost: this.createPost.bind(this),
      deletePost: this.deletePost.bind(this),
      findPosts: this.findPosts.bind(this),
      updatePost: this.updatePost.bind(this),
      updatePendingPost: this.updatePendingPost.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
