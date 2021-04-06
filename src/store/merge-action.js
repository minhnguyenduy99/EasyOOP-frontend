export default apis => {
  if (!apis) {
    return {};
  }
  const actions = {};
  Object.keys(apis).forEach(key => {
    let api = apis[key];
    actions[key] = (context, data) => api?.(data);
  });
  return actions;
};
