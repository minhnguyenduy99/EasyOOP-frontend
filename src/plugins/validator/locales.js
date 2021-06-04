export default () => {
  const context = require.context("./locales", true);
  const locales = {};

  context.keys().forEach(key => {
    const localeObj = context(key);
    const { locale, ...localeDefinitions } = localeObj.default;
    locales[locale] = localeDefinitions;
  });

  console.log(locales);
  return locales;
};
