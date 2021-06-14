import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import "@/assets/css/post-themes/github-overwrite.css";

// plugins
import createTipPlugin from "@kangc/v-md-editor/lib/plugins/tip/index";
import "@kangc/v-md-editor/lib/plugins/tip/tip.css";

import createHighlightLinesPlugin from "@kangc/v-md-editor/lib/plugins/highlight-lines/index";
import "@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css";

import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";

import createAlignPlugin from "@kangc/v-md-editor/lib/plugins/align";

// highlightjs
import hljs from "highlight.js/lib/core";

// languages
import json from "highlight.js/lib/languages/json";
import cpp from "highlight.js/lib/languages/cpp";

hljs.registerLanguage("json", json);
hljs.registerLanguage("cpp", cpp);

export default ({ VueMarkdownEditor, VMdPreview }) => {
  VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs,
    codeHighlightExtensionMap: {
      vue: "html"
    }
  });
  VMdPreview.use(githubTheme, {
    Hljs: hljs,
    codeHighlightExtensionMap: {
      vue: "xml"
    }
  });

  VueMarkdownEditor.use(createTipPlugin());
  VueMarkdownEditor.use(createHighlightLinesPlugin());
  VueMarkdownEditor.use(createCopyCodePlugin());
  VueMarkdownEditor.use(createAlignPlugin());

  VMdPreview.use(createTipPlugin());
  VMdPreview.use(createHighlightLinesPlugin());
  VMdPreview.use(createCopyCodePlugin());
  VMdPreview.use(createAlignPlugin());
};
