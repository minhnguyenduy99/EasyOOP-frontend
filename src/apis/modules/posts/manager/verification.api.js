import { BaseAPI } from "@/apis/base";

const endpoints = {
  findVerifications: "/search",
  getHistoryOfPost: "/posts",
  verify: "",
  unverify: "",
  getById: ""
};

export class ManagerVerificationAPI extends BaseAPI {
  async findVerifications(options) {
    const {
      page,
      search = null,
      sort_by = "last_edited_date",
      sort_order = "desc",
      status = null,
      creator_id = null
    } = options;
    const endpoint = this._addURLParams(endpoints.findVerifications, page);
    try {
      const response = await this._context.get(endpoint, {
        params: {
          search,
          sort_by,
          sort_order,
          status,
          creator_id
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async getVerificationById(opts) {
    const { verification_id } = opts;
    const endpoint = this._addURLParams(endpoints.getById, verification_id);
    try {
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async getHistoryOfPost(opts) {
    const { post_id } = opts;
    const endpoint = this._addURLParams(endpoints.getHistoryOfPost, post_id);
    try {
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async verify(options) {
    const { verification_id } = options;
    const endpoint = this._addURLParams(
      endpoints.verify,
      verification_id,
      "verify"
    );
    try {
      const response = await this._context.put(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async unverify(options) {
    const { verification_id } = options;
    const endpoint = this._addURLParams(
      endpoints.unverify,
      verification_id,
      "unverify"
    );
    try {
      const response = await this._context.put(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  getEndpointObject() {
    return {
      getHistoryOfPost: this.getHistoryOfPost.bind(this),
      findVerifications: this.findVerifications.bind(this),
      verify: this.verify.bind(this),
      unverify: this.unverify.bind(this),
      getVerificationById: this.getVerificationById.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
