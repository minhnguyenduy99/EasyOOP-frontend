import VeeValidate, { extend, localize, configure  } from "vee-validate";

import rules from "./extends";
import locales from "./locales.js";
import custom from "./custom";

export class FormValidatorPlugin {
  constructor() {}
  install() {
    const customRules = custom();
    applyRules({ ...rules, ...customRules });
    localize("vi_VN");
    localize(locales());
  }
}

function applyRules(rules) {
  Object.keys(rules).forEach(ruleName => {
    extend(ruleName, rules[ruleName]);
  });
}
