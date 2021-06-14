import { BaseAPI } from "../../base";

const endpoints = {
  createTest: "/",
  updateTest: "",
  searchTest: "/search",
  deleteTest: "",
  restoreTest: "",
  createSentence: "",
  createSentenceInBulk: "",
  updateSentence: "",
  getTestById: "",
  getTestTotalScore: "",
  deleteSentenceById: "/sentences",
  getAllTopics: "/topics/all"
};

export class TestAPI extends BaseAPI {
  async getAllTopics(opts) {
    try {
      const response = await this._context.get(endpoints.getAllTopics);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async createTest(opts) {
    const {
      title,
      type,
      topic_id,
      default_score_per_sentence,
      limited_time
    } = opts;
    try {
      const response = await this._context.post(endpoints.createTest, {
        title,
        type,
        topic_id,
        default_score_per_sentence,
        limited_time
      });

      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async updateTest(opts) {
    const {
      test_id,
      data: { title, type, topic_id, default_score_per_sentence, limited_time }
    } = opts;
    const endpoint = this._addURLParams(endpoints.updateTest, test_id);
    try {
      const response = await this._context.put(endpoint, {
        title,
        type,
        topic_id,
        default_score_per_sentence,
        limited_time
      });

      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async deleteTestById(opts) {
    const { test_id, permanently = false } = opts;
    const endpoint = this._addURLParams(endpoints.deleteTest, test_id);
    try {
      const response = await this._context.delete(endpoint, {
        params: {
          permanently
        }
      });

      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async restoreTest(opts) {
    const { test_id } = opts;
    const endpoint = this._addURLParams(
      endpoints.restoreTest,
      test_id,
      "restore"
    );
    try {
      const response = await this._context.put(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async searchTest(opts) {
    const {
      page = 1,
      verifying_status = null,
      title = null,
      topic_id = null,
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
          topic_id,
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

  async createSentence(opts) {
    const { test_id, data } = opts;
    const endpoint = this._addURLParams(
      endpoints.createSentence,
      test_id,
      "sentences"
    );
    try {
      const response = await this._context.post(endpoint, data);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async updateSentence(opts) {
    const { test_id, sentence_id, data } = opts;
    const endpoint = this._addURLParams(
      endpoints.createSentence,
      test_id,
      "sentences",
      sentence_id
    );
    try {
      const response = await this._context.put(endpoint, data);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async deleteSentences(opts) {
    const { test_id, sentencesIds } = opts;
    const endpoint = this._addURLParams(
      endpoints.createSentence,
      test_id,
      "sentences"
    );
    try {
      const response = await this._context.delete(endpoint, sentencesIds);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async deleteSentenceById(opts) {
    const { sentence_id } = opts;
    const endpoint = this._addURLParams(
      endpoints.deleteSentenceById,
      sentence_id
    );
    try {
      const response = await this._context.delete(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async createSentencesInBulk(opts) {
    const { sentences, test_id } = opts;
    const endpoint = this._addURLParams(
      endpoints.createSentenceInBulk,
      test_id,
      "sentences",
      "bulk"
    );
    try {
      const result = await this._context.post(endpoint, sentences);
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async getTestById(opts) {
    const { test_id, page, includeTest } = opts;
    const endpoint = this._addURLParams(
      endpoints.getTestById,
      test_id,
      "sentences"
    );
    try {
      const result = await this._context.get(endpoint, {
        params: {
          page,
          includeTest
        }
      });
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  async getTotalScoreOfTest(opts) {
    const { test_id } = opts;
    const endpoint = this._addURLParams(
      endpoints.getTestTotalScore,
      test_id,
      "total-score"
    );
    try {
      const result = await this._context.get(endpoint);
      return this._formatter.getDataFormat(result);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response);
    }
  }

  getEndpointObject() {
    return {
      getAllTopics: this.getAllTopics.bind(this),
      createTest: this.createTest.bind(this),
      updateTest: this.updateTest.bind(this),
      searchTest: this.searchTest.bind(this),
      createSentencesInBulk: this.createSentencesInBulk.bind(this),
      createSentence: this.createSentence.bind(this),
      updateSentence: this.updateSentence.bind(this),
      deleteSentences: this.deleteSentences.bind(this),
      getTestById: this.getTestById.bind(this),
      getTotalScoreOfTest: this.getTotalScoreOfTest.bind(this),
      deleteSentenceById: this.deleteSentenceById.bind(this),
      deleteTestById: this.deleteTestById.bind(this),
      restoreTest: this.restoreTest.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
