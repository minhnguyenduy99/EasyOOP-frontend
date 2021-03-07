import { BaseAPI } from "./base.api";
import { HTTP_CODES } from "./helpers";

export class AuthAPI extends BaseAPI {
  async login(data) {
    const reqEndpoint = `${this.endpoint}/login`;
    try {
      const response = await this._context.post(reqEndpoint, data, {
        withCredentials: true
      });
      if (response.status === HTTP_CODES.OK) {
        return this._responseFormatter.getDataFormat(response);
      }
      return this._responseFormatter.getErrorFormat(response);
    } catch (err) {
      return this._responseFormatter.getErrorFormat(err?.response ?? err);
    }
  }

  async getAuthenticatedUser() {
    const reqEndpoint = `${this.endpoint}/user`;
    try {
      const response = await this._context.get(reqEndpoint, {
        withCredentials: true
      });
      if (response.status === HTTP_CODES.OK) {
        return this._responseFormatter.getDataFormat(response);
      }
      return this._responseFormatter.getErrorFormat(response);
    } catch (err) {
      return this._responseFormatter.getErrorFormat(err?.response ?? err);
    }
  }

  async logout() {
    const reqEndpoint = `${this.endpoint}/logout`;
    try {
      const response = await this._context.get(reqEndpoint, {
        withCredentials: true
      });
      if (response.status === HTTP_CODES.OK) {
        return this._responseFormatter.getDataFormat(response);
      }
      return this._responseFormatter.getErrorFormat(response);
    } catch (err) {
      return this._responseFormatter.getErrorFormat(err?.response ?? err);
    }
  }
}
