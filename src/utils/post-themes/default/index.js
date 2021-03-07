import createDefaultTheme from "./theme";

const install = function(VMdEditor, options = {}) {
  const { extend, config, codeHighlightExtensionMap } = options;
  const theme = createDefaultTheme({
    baseConfig: config,
    codeHighlightExtensionMap
  });

  if (extend) theme.extend(extend);
  VMdEditor.theme(theme);
};

if (typeof window !== "undefined" && window.VMdEditor) {
  install(window.VMdEditor);
}

export default {
  install
};
