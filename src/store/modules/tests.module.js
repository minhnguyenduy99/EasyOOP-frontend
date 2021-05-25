import { mergeActionsWithOptions } from "../merge-action";

export default context => {
  const { apiService } = context;
  const testAPI = apiService.tests;
  return {
    namespaced: true,
    state: () => {},
    mutations: {},
    actions: mergeActionsWithOptions(testAPI)
  };
};
