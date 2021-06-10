import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Prism from "prismjs";

export default ({ VueMarkdownEditor, VMdPreview, PostPreviewContent }) => {
  VueMarkdownEditor.use(vuepressTheme, {
    Prism,
    codeHighlightExtensionMap: {
      vue: "html"
    }
  });
  VMdPreview.use(vuepressTheme, {
    Prism
  });
  // PostPreviewContent.use(vuepressTheme, {
  //   Prism
  // });
};
