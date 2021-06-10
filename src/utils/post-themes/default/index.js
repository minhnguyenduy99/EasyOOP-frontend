import createDefaultTheme from "./theme";

const install = function(VMdEditor, options = {}) {
  const { extend, config, codeHighlightExtensionMap, Hljs } = options;
  const theme = createDefaultTheme({
    Hljs,
    baseConfig: config,
    codeHighlightExtensionMap
  });

  if (extend) theme.extend(extend);
  VMdEditor.theme(theme);
};

export default {
  install
};
