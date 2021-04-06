import mergeAction from "../merge-action";

export default context => {
  const { apiService } = context;
  const tagApi = apiService.tags;
  return {
    namespaced: true,
    state: () => {},
    mutations: {},
    actions: mergeAction(tagApi)
  };
};
