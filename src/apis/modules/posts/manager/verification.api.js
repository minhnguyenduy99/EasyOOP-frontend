import { BaseAPI } from "@/apis/base";

const endpoints = {
  getPendingVerifications: "/pending/search",
  findVerifications: "/search",
  groupSummary: "/summary",
  verify: "",
  unverify: ""
};

export class ManagerVerificationAPI extends BaseAPI {
  async getPendingVerifications(options) {
    const {
      search = null,
      sort_by = "created_date",
      sort_order = "desc",
      type = null,
      group = false,
      page = 1
    } = options;
    const endpoint = this._addURLParams(
      endpoints.getPendingVerifications,
      page
    );
    try {
      const response = await this._context.get(endpoint, {
        params: {
          search,
          sort_by,
          sort_order,
          type,
          group
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async findVerifications(options) {
    const {
      search = null,
      sort_by = "created_date",
      sort_order = "desc",
      type = null,
      group = false,
      status = null,
      page = 1
    } = options;
    const endpoint = this._addURLParams(endpoints.findVerifications, page);
    try {
      const response = await this._context.get(endpoint, {
        params: {
          search,
          sort_by,
          sort_order,
          type,
          status,
          group
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async getGroupSummary() {
    try {
      const response = await this._context.get(endpoints.groupSummary);
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
      getPendingVerifications: this.getPendingVerifications.bind(this),
      findVerifications: this.findVerifications.bind(this),
      getGroupSummary: this.getGroupSummary.bind(this),
      verify: this.verify.bind(this),
      unverify: this.unverify.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
