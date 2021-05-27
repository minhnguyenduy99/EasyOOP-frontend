import createPersistedState from "vuex-persistedstate";

export default options => {
  const { paths } = options;
  return createPersistedState({
    paths,
    storage: localStorage
  });
};
