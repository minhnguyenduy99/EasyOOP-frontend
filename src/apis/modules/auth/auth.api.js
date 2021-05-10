/* eslint-disable no-undef */
import { BaseAPI } from "../../base";
import { HTTP_CODES } from "../../helpers";

const endpoints = {
  loginFacebook: "/facebook/login",
  loginFacebookToken: "/facebook/login-with-token",
  loginWithGoogleToken: "/google/login-with-token",
  logout: "/logout",
  relogin: "/relogin"
};

export class AuthAPI extends BaseAPI {
  async login(data) {
    const reqEndpoint = `${this.endpoint}/login`;
    try {
      const response = await this._context.post(reqEndpoint, data, {
        withCredentials: true
      });
      if (response.status === HTTP_CODES.OK) {
        return this._formatter.getDataFormat(response);
      }
      return this._formatter.getErrorFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async loginWithFacebookToken() {
    const { authResponse = null } = await new Promise(resolve => {
      // eslint-disable-next-line no-undef
      FB.login(
        response => {
          resolve(response);
        },
        { scope: "email" }
      );
    });
    if (!authResponse) {
      const error = "Application is not fully authorized by user";
      console.log(error);
      return this._formatter.getErrorFormat(error);
    }
    const accessToken = authResponse.accessToken;
    try {
      const response = await this._context.get(endpoints.loginFacebookToken, {
        withCredentials: true,
        params: {
          access_token: accessToken
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async loginWithGoogleToken(opts) {
    try {
      const { payload } = opts;

      let idToken = payload.getAuthResponse().id_token;
      const response = await this._context.get(endpoints.loginWithGoogleToken, {
        withCredentials: true,
        params: {
          idToken
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      console.log(err);
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async relogin() {
    try {
      const response = await this._context.post(endpoints.relogin);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async logout() {
    try {
      const response = await this._context.post(
        endpoints.logout,
        {},
        {
          withCredentials: true
        }
      );
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  getEndpointObject() {
    return {
      loginWithGoogleToken: this.loginWithGoogleToken.bind(this),
      loginWithFacebookToken: this.loginWithFacebookToken.bind(this),
      logout: this.logout.bind(this),
      relogin: this.relogin.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
