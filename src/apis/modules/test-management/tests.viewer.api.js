import { BaseAPI } from "../../base";

const endpoints = {
  getTestById: "",
  getTestSentences: ""
};

export class TestViewerAPI extends BaseAPI {
  async getTestById(opts) {
    const { test_id } = opts;
    const endpoint = this._addURLParams(endpoints.getTestById, test_id);
    try {
      const result = await this._context.get(endpoint);
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async getTestSentenceByPage(opts) {
    const { test_id, page } = opts;
    const endpoint = this._addURLParams(
      endpoints.getTestSentences,
      test_id,
      "sentences"
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
      getTestById: this.getTestById.bind(this),
      getTestSentenceByPage: this.getTestSentenceByPage.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
