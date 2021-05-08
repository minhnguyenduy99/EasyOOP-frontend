import { mergeActionsWithOptions } from "../merge-action";

export default context => {
  const { apiService } = context;
  const roleManagementAPI = apiService.role_management;
  return {
    namespaced: true,
    state: () => {},
    mutations: {},
    actions: mergeActionsWithOptions(roleManagementAPI, {
      prefix: "creatorRole"
    })
  };
};
