import createPersistedState from "vuex-persistedstate";

export default options => {
  const { path } = options;
  return createPersistedState({
    paths: [path],
    storage: localStorage
  });
};
