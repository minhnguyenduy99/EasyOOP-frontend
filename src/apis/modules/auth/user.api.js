/* eslint-disable no-undef */
import { BaseAPI } from "../../base";

const endpoints = {
  updatePassword: "/update-password",
  updateProfile: "/profile",
  updateAvatar: "/avatar"
};

export class AuthUserAPI extends BaseAPI {
  async updatePassword(opts) {
    const { password } = opts;
    try {
      const response = await this._context.put(endpoints.updatePassword, {
        password
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async updateProfile(opts) {
    const { form } = opts;
    try {
      const response = await this._context.put(endpoints.updateProfile, form);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async updateAvatar(opts) {
    const { avatar } = opts;
    const form = new FormData();
    form.set("avatar", avatar);
    try {
      const response = await this._context.put(endpoints.updateAvatar, form);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  getEndpointObject() {
    return {
      updatePassword: this.updatePassword.bind(this),
      updateProfile: this.updateProfile.bind(this),
      updateAvatar: this.updateAvatar.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
