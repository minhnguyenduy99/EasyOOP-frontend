export default () => {
  const context = require.context("./custom", true);
  const rules = {};

  context.keys().forEach(key => {
    const validator = context(key);
    const { name, rule } = validator.default;
    rules[name] = rule;
  });

  return rules;
};
