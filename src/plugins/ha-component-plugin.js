import * as baseComponents from "@/components/base";

export const HaComponentPlugin = {
  install(Vue) {
    Object.keys(baseComponents).forEach(key => {
      Vue.component(baseComponents[key].name, baseComponents[key]);
    });
  }
};
