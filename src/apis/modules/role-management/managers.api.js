/* eslint-disable no-undef */
import { BaseAPI } from "../../base";

const endpoints = {
  findById: "",
  updateManager: ""
};

export class ManagerAPI extends BaseAPI {
  async findById(opts) {
    const { manager_id } = opts;
    const endpoint = this._addURLParams(endpoints.findById, manager_id);
    try {
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async updateManager(opts) {
    const { manager_id, form } = opts;
    const endpoint = this._addURLParams(endpoints.updateManager, manager_id);
    try {
      const response = await this._context.put(endpoint, form, {
        withCredentials: true
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  getEndpointObject() {
    return {
      findById: this.findById.bind(this),
      updateManager: this.updateManager.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
