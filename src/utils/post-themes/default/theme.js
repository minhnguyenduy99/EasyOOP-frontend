import createHljsTheme from "@kangc/v-md-editor/lib/theme/hljs";

const previewClass = "default-markdown-body";

export default function createDefaultPostTheme(config) {
  const hljsTheme = createHljsTheme({
    Hljs: config.Hljs,
    codeHighlightExtensionMap: config.codeHighlightExtensionMap || {},
    baseConfig: config.baseConfig,
    codeBlockClass: config.codeBlockClass || (lang => `v-md-hljs-${lang}`)
  });

  return {
    previewClass,
    extend(callback) {
      hljsTheme.extend(callback);
    },
    markdownParser: hljsTheme.markdownParser
  };
}
