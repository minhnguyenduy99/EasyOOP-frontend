import mergeActions from "../merge-action";

export default context => {
  const { apiService } = context;
  const qandaAPI = apiService.qanda;
  return {
    namespaced: true,
    state: () => {},
    mutations: {},
    actions: mergeActions(qandaAPI)
  };
};
