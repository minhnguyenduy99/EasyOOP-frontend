const DEFAULT_STATE = {
  isAuthenticated: false,
  user: null
};

export default context => {
  const { apiService } = context;
  return {
    namespaced: true,
    state: () => ({
      ...DEFAULT_STATE
    }),
    mutations: {
      reset(state) {
        state = { ...DEFAULT_STATE };
      },
      updateAuth(state, data) {
        state.isAuthenticated = true;
        state.user = data.user;
      }
    },
    actions: {
      async login({ commit }, data) {
        const result = await apiService.auth.login(data);
        if (result.error) {
          commit("reset");
          return result;
        }
        commit("updateAuth", result.data);
        return result;
      }
    }
  };
};
