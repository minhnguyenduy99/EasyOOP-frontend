import { BaseAPI } from "../../base";

const endpoints = {
  getTestById: "",
  getTestSentences: "",
  searchTest: "/search",
  getTestsGroupedByTopic: "/topics"
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

  async getTestsGroupedByTopic(opts) {
    try {
      const result = await this._context.get(endpoints.getTestsGroupedByTopic);
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async searchTest(opts) {
    const {
      page = 1,
      verifying_status = null,
      title = null,
      sort_order = null,
      creator_id = null,
      sort_by = null,
      type = null
    } = opts ?? {};
    try {
      const response = await this._context.get(endpoints.searchTest, {
        params: {
          page,
          verifying_status,
          title,
          sort_order,
          creator_id,
          sort_by,
          type
        }
      });
      return this._formatter.getDataFormat(response);
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
      getTestSentenceByPage: this.getTestSentenceByPage.bind(this),
      searchTest: this.searchTest.bind(this),
      getTestsGroupedByTopic: this.getTestsGroupedByTopic.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
