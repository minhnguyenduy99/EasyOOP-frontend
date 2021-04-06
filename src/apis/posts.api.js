import { BaseAPI } from "./base.api";
import { createFile, HTTP_CODES } from "./helpers";
import createForm from "./helpers/create-form";

const endpoints = {
  createPost: "/admin",
  findById: "/admin",
  deletePost: "/admin",
  findByStatus: "/admin",
  findPosts: "/search",
  findByTopic: "/topic"
};

export class PostAPI extends BaseAPI {
  async createPost(data) {
    data.post_type = "series";
    data.content_file = createFile(data.content_file, { type: "text/plain" });
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

  async getPostsByStatus(options) {
    const {
      page = 1,
      searchOptions: {
        post_status = 0,
        search = "",
        sort_by = "created_date",
        sort_order = "asc",
        topic_id = null
      }
    } = options;
    const endpoint = this._addURLParams(
      endpoints.findByStatus,
      post_status,
      page
    );
    try {
      const response = await this._context.get(endpoint, {
        params: { search, sort_by, sort_order, topic_id }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async getPosts(options) {
    const {
      page = 1,
      searchOptions: {
        search = "",
        sort_by = "created_date",
        sort_order = "asc",
        topic_id = null
      }
    } = options;
    const endpoint = this._addURLParams(endpoints.findPosts, page);
    try {
      const response = await this._context.get(endpoint, {
        params: { search, sort_by, sort_order, topic_id }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async getPostsByTopic(options) {
    const { topicId, page = 1 } = options;
    const endpoint = this._addURLParams(endpoints.findByTopic, topicId, page);
    try {
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async getPostById(postId) {
    const endpoint = this._addURLParams(endpoints.findByTopic, postId);
    try {
      const response = await this._context.get(endpoint);
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

  getEndpointObject() {
    return {
      createPost: this.createPost.bind(this),
      getPosts: this.getPosts.bind(this),
      getPostsByTopic: this.getPostsByTopic.bind(this),
      deletePost: this.deletePost.bind(this),
      getPostById: this.getPostById.bind(this),
      getPostsByStatus: this.getPostsByStatus.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
