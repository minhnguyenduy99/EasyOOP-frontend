import { extend, localize } from "vee-validate";

import rules from "./extends";
import locales from "./locales";
import custom from "./custom";

export class FormValidatorPlugin {
  constructor() {}
  install(Vue) {
    const customRules = custom();
    applyRules({ ...rules, ...customRules });

    const { locales: localeConfig, serverLocaler } = locales();
    localize(localeConfig);

    serverLocaler.setLocale("vi_VN");
    localize("vi_VN");

    Vue.prototype.$serverLocaler = serverLocaler;
  }
}

function applyRules(rules) {
  Object.keys(rules).forEach(ruleName => {
    extend(ruleName, rules[ruleName]);
  });
}
