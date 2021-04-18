import path from "path";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export default (relativePaths = []) => {
  const components = {};

  relativePaths.forEach(componentPath => {
    const componentName = componentPath
      .split("/")
      .pop()
      .replace(/\.\w+$/, "");
    components[componentName] = () => import(componentPath);
  });

  return components;
};
