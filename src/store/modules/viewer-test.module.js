import { mergeActionsWithOptions } from "../merge-action";

export default context => {
  const { apiService } = context;
  const testAPI = apiService.tests;
  return {
    namespaced: true,
    state: () => ({
      SENTENCE_PER_GROUP: 4,
      answerGroups: [],
      testId: null,
      numberOfGroups: 0,
      currentPage: -1,
      pageCount: 0,
      selectedSentenceOrder: 0
    }),
    mutations: {
      initTestResultSession: (state, test) => {
        const { test_id, list_sentence_ids } = test;
        const sentenceCount = list_sentence_ids.length;
        state.numberOfGroups = Math.ceil(
          sentenceCount / state.SENTENCE_PER_GROUP
        );
        state.answerGroups.length = 0;
        state.testId = test_id;
        for (let i = 0; i < state.numberOfGroups; i++) {
          let group = {
            answers: []
          };
          const offset = i * state.SENTENCE_PER_GROUP;
          const rightBound = Math.min(
            offset + state.SENTENCE_PER_GROUP,
            list_sentence_ids.length
          );
          for (let senOrder = offset; senOrder < rightBound; senOrder++) {
            group.answers.push({
              sentence_id: list_sentence_ids[senOrder],
              user_answer: -1,
              answered: false
            });
          }
          state.answerGroups.push(group);
        }
      },
      updateCurrentPage(state, page) {
        state.currentPage = page < 1 ? 1 : page;
      },
      updateAnswerGroup(state, results) {
        const answerGroup = state.answerGroups[state.currentPage - 1];
        answerGroup.answers.forEach((answer, index) => {
          answer.answer = results[index].answer;
        });
      },
      updateAllAnswerGroups(state, results) {
        for (let i = 0; i < state.numberOfGroups; i++) {
          const offset = i * state.SENTENCE_PER_GROUP;
          const rightBound = Math.min(
            offset + state.SENTENCE_PER_GROUP,
            results.length
          );
          let groupAnswers = state.answerGroups[i].answers;
          for (let senOrder = offset; senOrder < rightBound; senOrder++) {
            const { user_answer } = results[senOrder];
            groupAnswers[senOrder - offset] = {
              ...groupAnswers[senOrder - offset],
              user_answer: user_answer,
              answered: user_answer > -1
            };
          }
        }
      },
      updatePagination: (state, data) => {
        const { page, page_count } = data;
        state.currentPage = page;
        state.pageCount = page_count;
      },
      updateSelectedSentenceOrder: (state, sentenceOrder) => {
        state.selectedSentenceOrder = sentenceOrder;
      }
    },
    getters: {
      sentencesPerGroup(state) {
        return state.SENTENCE_PER_GROUP;
      },
      currentPage(state) {
        return state.currentPage;
      },
      pageCount(state) {
        return state.pageCount;
      },
      answerGroups: state => {
        return state.answerGroups;
      },
      currentAnswerGroup(state, getters) {
        return state.answerGroups[getters.currentPage - 1];
      },
      pageOfSentence: state => order => {
        const page = Math.ceil(order / state.SENTENCE_PER_GROUP);
        return page;
      },
      totalAnswers(state) {
        const answers = [];
        state.answerGroups.forEach(group => {
          group.answers.forEach(answer => answers.push(answer));
        });
        return answers;
      }
    },
    actions: {
      ...mergeActionsWithOptions(testAPI, { prefix: "viewer" }),

      async navigateToPage({ state, commit }, { page }) {
        const result = await testAPI.viewer_getTestSentenceByPage({
          test_id: state.testId,
          page
        });
        const { error, data } = result;
        if (error) {
          return { error };
        }
        const { total_count, page_count, results } = data;
        commit("updatePagination", { page, page_count });
        commit("updateAnswerGroup", results);
        return { data };
      },

      async getTestById({ commit }, testId) {
        const { error, data } = await testAPI.viewer_getTestById({
          test_id: testId
        });
        if (error) {
          return { error };
        }
        commit("initTestResultSession", data);
        return { data };
      },

      async getTestResultBySessionId({ commit }, sessionId) {
        const { error, data } = await testAPI.viewer_getTestResultBySession({
          session_id: sessionId
        });
        if (error) {
          return { error };
        }
        const { data: testResult } = data;
        commit("updateAllAnswerGroups", testResult.results);
        return { data };
      }
    }
  };
};
