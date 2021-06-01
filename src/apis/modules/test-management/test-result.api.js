import { BaseAPI } from "../../base";

const endpoints = {
  createTestResult: "",
  getTestResultBySession: "/by-session",
  searchTestResults: "/search",
  getTestResultById: "",
  calculateTestResult: "/calculate",
  getDetailOfTestResult: ""
};

export class TestResultAPI extends BaseAPI {
  async createTestResult(opts) {
    if (opts.save) {
      return this.saveTestResult(opts);
    }
    const { test_id, results } = opts;
    try {
      const result = await this._context.post(endpoints.calculateTestResult, {
        test_id,
        results
      });
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async getTestResultBySession(opts) {
    const { session_id } = opts;
    const endpoint = this._addURLParams(
      endpoints.getTestResultBySession,
      session_id
    );
    try {
      const result = await this._context.get(endpoint);
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async saveTestResult(opts) {
    const { test_id, results } = opts;
    try {
      const result = await this._context.post(endpoints.createTestResult, {
        test_id,
        results
      });
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async searchTestResults(opts) {
    const { page, sort_by = "created_date", sort_order = "-1" } = opts;
    try {
      const result = await this._context.get(endpoints.searchTestResults, {
        params: {
          page,
          sort_by,
          sort_order
        }
      });
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async getTestResultById(opts) {
    const { result_id } = opts;
    const endpoint = this._addURLParams(endpoints.getTestResultById, result_id);
    try {
      const result = await this._context.get(endpoint);
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async getDetailOfTestResult(opts) {
    const { result_id, page } = opts;
    const endpoint = this._addURLParams(
      endpoints.getDetailOfTestResult,
      result_id,
      "detail"
    );
    try {
      const result = await this._context.get(endpoint, {
        params: {
          page
        }
      });
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  getEndpointObject() {
    return {
      createTestResult: this.createTestResult.bind(this),
      searchTestResults: this.searchTestResults.bind(this),
      getTestResultById: this.getTestResultById.bind(this),
      getDetailOfTestResult: this.getDetailOfTestResult.bind(this),
      getTestResultBySession: this.getTestResultBySession.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
