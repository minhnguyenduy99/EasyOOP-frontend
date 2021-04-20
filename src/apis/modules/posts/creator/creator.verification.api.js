import { BaseAPI } from "@/apis/base";

const endpoints = {
  deletePendingVerifications: "",
  updateVerification: "",
  cancelVerification: "/cancel",
  getById: ""
};

export class CreatorVerificationAPI extends BaseAPI {
  async deletePendingVerifications(opts) {
    const { verifications = [] } = opts;
    const input = {
      action: "delete",
      data: verifications
    };
    try {
      const response = await this._context.patch(
        endpoints.deletePendingVerifications,
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
      const response = await this._context.delete(endpoint, data);
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

  getEndpointObject() {
    return {
      deletePendingVerifications: this.deletePendingVerifications.bind(this),
      updateVerification: this.updateVerification.bind(this),
      cancelVerification: this.cancelVerification.bind(this),
      getVerificationById: this.getVerificationById.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
