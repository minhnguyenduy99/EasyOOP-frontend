import { BaseAPI } from "../../base";

const endpoints = {
  createTestResult: ""
};

export class TestResultAPI extends BaseAPI {
  async createTestResult(opts) {
    const { test_id, results, save } = opts;
    try {
      const result = await this._context.post(
        endpoints.createTestResult,
        {
          test_id,
          results
        },
        {
          params: {
            save
          }
        }
      );
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  getEndpointObject() {
    return {
      createTestResult: this.createTestResult.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
