export default () => {
  const context = require.context("./locales", true);
  const locales = {};
  const serverLocaler = new ServerLocaler();

  context.keys().forEach(key => {
    const localeObj = context(key);
    const { locale, serverSide, ...localeDefinitions } = localeObj.default;
    locales[locale] = localeDefinitions;
    serverLocaler.localize(locale, serverSide);
  });
  return {
    locales,
    serverLocaler
  };
};

class ServerLocaler {
  _DEFAULT_MODULE = "global";
  _locales;
  _currentLocale;

  /**
   * @param {{ locale: string, data: any }} config Config
   */
  constructor(config = null) {
    this._currentLocale = "en";
    this._locales = {};

    const { locale, data } = config ?? {};
    if (!locale || !data || !config) {
      return;
    }
    this.localize(locale, data);
  }

  /**
   * @param {string} locale The locale of data
   * @param {{ messages: any, names: any }} data Data
   */
  localize(locale, data) {
    const { messages, names } = data;
    this._locales[locale] && delete this._locales[locale];
    this._locales[locale] = {
      messages,
      names
    };
  }

  /**
   * Set the current localization
   * @param {string} locale The locale of data
   */
  setLocale(locale) {
    this._currentLocale = locale;
  }

  /**
   * @param {string} errorType The error type. Format: `<module>.<name>`
   * @returns
   */
  getMessage(errorType) {
    const errorParts = errorType?.split(".");
    if (!errorParts) {
      throw new Error("Invalid error type");
    }
    errorParts.length === 1 && errorParts.unshift(this._DEFAULT_MODULE);
    const [module, error] = errorParts;
    const messages = this._locales[this._currentLocale]?.messages;
    return messages?.[module]?.[error];
  }
}
