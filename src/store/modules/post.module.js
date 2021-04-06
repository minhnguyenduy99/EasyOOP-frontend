import mergeAction from "../merge-action";

export default context => {
  const { apiService } = context;
  const postApi = apiService.posts;
  return {
    namespaced: true,
    state: () => {},
    mutations: {},
    actions: mergeAction(postApi)
  };
};
