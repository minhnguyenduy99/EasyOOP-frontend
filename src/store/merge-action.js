export default (...listApis) => {
  const actions = {};
  listApis.forEach(apis => {
    Object.keys(apis).forEach(key => {
      let api = apis[key];
      actions[key] = (context, data) => api?.(data);
    });
  });
  return actions;
};

/**
 * @param {any} api
 * @param {{ include: string[], exclude: string[], prefix: string }} opts
 * @returns
 */
export const mergeActionsWithOptions = (api, opts = {}) => {
  const { include = null, exclude = [], prefix = "" } = opts;
  const actions = {};
  let includedActions = include ?? Object.keys(api);
  includedActions = includedActions.filter(
    action => action.startsWith(prefix) && exclude.indexOf(action) === -1
  );
  includedActions.forEach(actionName => {
    actions[actionName] = (context, data) => api?.(data);
  });
  return actions;
};
