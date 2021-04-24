import { BaseAPI } from "@/apis/base";

const endpoints = {
  deleteVerifications: "",
  updateVerification: "",
  cancelVerification: "/cancel",
  findVerifications: "/search",
  getById: ""
};

export class CreatorVerificationAPI extends BaseAPI {
  async deleteVerifications(opts) {
    const { verifications = [] } = opts;
    const input = {
      action: "delete",
      data: verifications
    };
    try {
      const response = await this._context.patch(
        endpoints.deleteVerifications,
        input
      );
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async updateVerification(opts) {
    const { verification_id, data = {} } = opts;
    const endpoint = this._addURLParams(
      endpoints.updateVerification,
      verification_id
    );
    try {
      console.log(data);
      const response = await this._context.put(endpoint, data);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  async cancelVerification(opts) {
    const { verification_id, data = {} } = opts;
    const endpoint = this._addURLParams(
      endpoints.cancelVerification,
      verification_id
    );
    try {
      const response = await this._context.delete(endpoint);
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

  async findVerifications(options) {
    const {
      search = null,
      sort_by = "created_date",
      sort_order = "desc",
      type = null,
      status = null,
      limit = null,
      group = false
    } = options;
    try {
      const response = await this._context.get(endpoints.findVerifications, {
        params: {
          search,
          sort_by,
          sort_order,
          type,
          status,
          limit,
          group
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err);
    }
  }

  getEndpointObject() {
    return {
      deleteVerifications: this.deleteVerifications.bind(this),
      updateVerification: this.updateVerification.bind(this),
      cancelVerification: this.cancelVerification.bind(this),
      getVerificationById: this.getVerificationById.bind(this),
      findVerifications: this.findVerifications.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
