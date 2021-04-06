import mergeAction from "../merge-action";

export default context => {
  const { apiService } = context;
  const topicApi = apiService.topics;
  console.log(topicApi);
  return {
    namespaced: true,
    state: () => {},
    mutations: {},
    actions: mergeAction(topicApi)
  };
};
