import { BaseAPI } from "../../base";

const endpoints = {
  createQuestion: "",
  updateQuestion: "",
  searchQuestion: "/search",
  getQuestionByTag: "/tag",
  getQuestionById: "",
  getUnusedQuestionTags: "/unused-tags",
  searchUnusedTags: "/tags/search"
};

export class QandAAPI extends BaseAPI {
  async createQuestion(opts) {
    const { question, answer, tag_id } = opts;
    try {
      const response = await this._context.post(endpoints.createQuestion, {
        question,
        answer,
        tag_id
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async searchUnusedTags(opts) {
    const { search } = opts;
    try {
      const response = await this._context.get(endpoints.searchUnusedTags, {
        params: {
          search
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async updateQuestion(opts) {
    const { question, answer, tag_id, qa_id } = opts;
    const endpoint = this._addURLParams(endpoints.updateQuestion, qa_id);
    try {
      const response = await this._context.put(endpoint, {
        question,
        answer,
        tag_id
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async searchQuestion(opts) {
    const { page, value, hasTag } = opts;
    try {
      const response = await this._context.get(endpoints.searchQuestion, {
        params: {
          page,
          hasTag,
          value
        }
      });
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async getQuestionByTag(opts) {
    const { tag_id } = opts;
    const endpoint = this._addURLParams(endpoints.getQuestionByTag, tag_id);
    try {
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async getQuestionById(opts) {
    const { qa_id } = opts;
    const endpoint = this._addURLParams(endpoints.getQuestionById, qa_id);
    try {
      const response = await this._context.get(endpoint);
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  async getUnusedQuestionTags(opts) {
    const { search } = opts;
    try {
      const response = await this._context.get(
        endpoints.getUnusedQuestionTags,
        {
          params: {
            search
          }
        }
      );
      return this._formatter.getDataFormat(response);
    } catch (err) {
      return this._formatter.getErrorFormat(err?.response ?? err);
    }
  }

  getEndpointObject() {
    return {
      createQuestion: this.createQuestion.bind(this),
      getQuestionByTag: this.getQuestionByTag.bind(this),
      getQuestionById: this.getQuestionById.bind(this),
      getUnusedQuestionTags: this.getUnusedQuestionTags.bind(this),
      updateQuestion: this.updateQuestion.bind(this),
      searchQuestion: this.searchQuestion.bind(this),
      searchUnusedTags: this.searchUnusedTags.bind(this)
    };
  }

  _initAPIEndpoints() {
    this._prefixEndpoint(endpoints);
  }
}
