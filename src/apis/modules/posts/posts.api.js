import { BaseAPI } from "../../base";

const endpoints = {
  findPosts: "/search",
  findByTopic: "/topic",
  getPostsGroupedByTopics: "/topics",
  getPostById: ""
};

export class PostAPI extends BaseAPI {
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

  async getPostsGroupedByTopics() {
    try {
      const response = await this._context.get(
        endpoints.getPostsGroupedByTopics
      );
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async getPostsByTopic(options) {
    const { topicId } = options;
    const endpoint = this._addURLParams(endpoints.findByTopic, topicId);
    try {
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async getPostById(postId) {
    const endpoint = this._addURLParams(endpoints.getPostById, postId);
    try {
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  getEndpointObject() {
    return {
      getPosts: this.getPosts.bind(this),
      getPostsByTopic: this.getPostsByTopic.bind(this),
      getPostById: this.getPostById.bind(this),
      getPostsGroupedByTopics: this.getPostsGroupedByTopics.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
