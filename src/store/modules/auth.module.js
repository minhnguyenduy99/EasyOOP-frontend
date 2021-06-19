import mergeAction from "../merge-action";
import Cookie from "js-cookie";

const ACCESS_TOKEN_COOKIE = "accessToken";
const ROLE_ID_COOKIE = "auth_role";

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: null,
  active_role: null,
  role_id: null,
  access_token: null
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
        state.role_id = null;
        state.active_role = null;
      },
      updateAuth(state, data) {
        const { user, access_token } = data;
        state.isAuthenticated = true;
        state.user = user;
        state.role_id = user.role_id;
        state.active_role = user.active_role;
        state.access_token = access_token;
      },
      updateUserAvatar(state, avatar) {
        state.user.profile.profile_pic = avatar;
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
        return state.active_role;
      },
      roleId(state) {
        return state.role_id;
      }
    },
    actions: {
      ...mergeAction(authApi),
      async relogin({ commit, getters }) {
        const cookie = Cookie.get(ACCESS_TOKEN_COOKIE);
        // the current access token in user is still valid
        if (getters.isAuthenticated && cookie) {
          return { data: getters.user };
        }
        let { error, data } = await authApi.relogin();
        if (error) {
          commit("reset");
          return { error };
        }
        commit("updateAuth", data);
        return { data: getters.user };
      },
      async loginWithFacebookToken({ commit }) {
        const { error, data } = await authApi.loginWithFacebookToken();
        if (error) {
          commit("reset");
          return { error };
        }
        commit("updateAuth", data);
        return { data };
      },
      async loginWithGoogleToken({ commit }, opts) {
        const { error, data } = await authApi.loginWithGoogleToken(opts);
        if (error) {
          commit("reset");
          return { error };
        }
        commit("updateAuth", data);
        return { data };
      },
      async loginWithPassword({ commit }, opts) {
        const { error, data } = await authApi.loginWithPassword(opts);
        if (error) {
          commit("reset");
          return { error };
        }
        commit("updateAuth", data);
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
        commit("updateAuth", data);
        return { data };
      }
    }
  };
};
