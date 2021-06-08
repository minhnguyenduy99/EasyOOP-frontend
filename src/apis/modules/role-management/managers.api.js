/* eslint-disable no-undef */
import { BaseAPI } from "../../base";

const endpoints = {
  findById: "",
  findManagers: "/search",
  updateManager: "",
  assignManager: "/assign"
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

  async assignManager(opts) {
    const { user_id, form } = opts;
    try {
      const endpoint = this._addURLParams(endpoints.assignManager, user_id);
      const response = await this._context.post(endpoint, form);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      console.log(err);
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async findManagers(opts) {
    const {
      page = 1,
      alias = "",
      sort_order = "desc",
      sort_by = "created_date"
    } = opts;
    try {
      const endpoint = this._addURLParams(endpoints.findManagers, page);
      const response = await this._context.get(endpoint, {
        withCredentials: true,
        params: {
          alias,
          sort_order,
          sort_by
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      console.log(err);
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
      updateManager: this.updateManager.bind(this),
      assignManager: this.assignManager.bind(this),
      findManagers: this.findManagers.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
