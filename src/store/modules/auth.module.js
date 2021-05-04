import mergeAction from "../merge-action";

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: null
};

export default context => {
  const { apiService } = context;
  const authApi = apiService.auth;
  const roleApi = apiService.role_management;
  return {
    namespaced: true,
    state: () => ({
      ...DEFAULT_STATE
    }),
    mutations: {
      reset(state) {
        state.isAuthenticated = false;
        state.user = null;
      },
      updateAuth(state, data) {
        state.isAuthenticated = true;
        console.log(data);
        state.user = data.user;
      }
    },
    getters: {
      user(state) {
        return state.user;
      },
      profile(state) {
        return state.user?.profile;
      },
      isAuthenticated(state) {
        return state.isAuthenticated;
      },
      userRoles(state) {
        return state.user?.roles ?? [];
      },
      activeRole(state) {
        return state.user?.active_role;
      }
    },
    actions: {
      ...mergeAction(authApi),
      async loginWithFacebookToken({ commit }) {
        const { error, data } = await authApi.loginWithFacebookToken();
        if (error) {
          commit("reset");
          return { error };
        }
        console.log(data);
        commit("updateAuth", data.data);
        return { data };
      },
      async loginWithGoogleToken({ commit }, opts) {
        const { error, data } = await authApi.loginWithGoogleToken(opts);
        if (error) {
          commit("reset");
          return { error };
        }
        commit("updateAuth", data.data);
        return { data };
      },
      async logout({ commit }) {
        const { error } = await authApi.logout();
        console.log(error);
        if (error) {
          return false;
        }
        commit("reset");
        return true;
      },
      async loginAsRole({ commit }, opts) {
        const { error, data } = await roleApi.loginAsRole(opts);
        if (error) {
          return { error };
        }
        commit("updateAuth", data.data);
        return { data };
      }
    }
  };
};

function tenHam(a, b) {}
