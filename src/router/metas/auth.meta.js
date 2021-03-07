export default (
  requiresAuth,
  redirectIfAuth = null,
  redirectIfNotAuth = null
) => {
  if (redirectIfAuth) {
    return {
      name: "AuthMeta",
      requiresAuth,
      redirectIfAuth
    };
  }
  return {
    name: "AuthMeta",
    requiresAuth,
    redirectIfNotAuth
  };
};
