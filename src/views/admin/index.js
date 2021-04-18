const loadPageConfig = () => {
  const requireConfig = require.context("./", true, /\.?page\.(js)$/);

  const listConfigs = [];

  requireConfig.keys().forEach(key => {
    const config = requireConfig(key);
    listConfigs.push(config.default || config);
  })

  return listConfigs;
}

export default loadPageConfig();
