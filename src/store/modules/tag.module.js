import mergeActions from "../merge-action";

export default context => {
  const { apiService } = context;
  const tagAPI = apiService.tags;
  return {
    namespaced: true,
    state: () => {},
    mutations: {},
    actions: mergeActions(tagAPI)
  };
};
