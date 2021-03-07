import { extend } from "vee-validate";
import rules from "./validator";

export class FormValidatorPlugin {
  constructor() {}
  install() {
    Object.keys(rules).forEach(ruleName => {
      extend(ruleName, rules[ruleName]);
    });
  }
}
