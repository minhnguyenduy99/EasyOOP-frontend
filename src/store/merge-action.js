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
