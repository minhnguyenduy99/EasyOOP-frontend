/* eslint-disable no-undef */
import { BaseAPI } from "../../base";

const endpoints = {
  loginAsRole: "role-authentication"
};

export class RoleAuthenticationAPI extends BaseAPI {
  async loginAsRole(opts) {
    const { role } = opts;
    try {
      const endpoint = this._addURLParams(endpoints.loginAsRole, role, "login");
      const response = await this._context.post(
        endpoint,
        {},
        {
          withCredentials: true
        }
      );
      return this._formatter.getDataFormat(response);
    } catch (err) {
      console.log(err);
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  getEndpointObject() {
    return {
      loginAsRole: this.loginAsRole.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
