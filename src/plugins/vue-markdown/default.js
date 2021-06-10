import defaultTheme from "@/utils/post-themes/default";
import "@/assets/css/post-themes/default.css";
// highlightjs
import hljs from "highlight.js/lib/core";
// languages
import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("json", json);

export default ({ VueMarkdownEditor, VMdPreview, PostPreviewContent }) => {
  VueMarkdownEditor.use(defaultTheme, {
    Hljs: hljs
  });
  VMdPreview.use(defaultTheme, {
    Hljs: hljs
  });
  PostPreviewContent.use(defaultTheme, {
    Hljs: hljs
  });
};
