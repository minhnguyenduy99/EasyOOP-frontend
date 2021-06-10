import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import "@/assets/css/post-themes/github-overwrite.css";

// highlightjs
import hljs from "highlight.js/lib/core";

// languages
import json from "highlight.js/lib/languages/json";
import cpp from "highlight.js/lib/languages/cpp";

hljs.registerLanguage("json", json);
hljs.registerLanguage("cpp", cpp);

export default ({ VueMarkdownEditor, VMdPreview, PostPreviewContent }) => {
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
};
