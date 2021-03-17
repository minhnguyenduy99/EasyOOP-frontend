import VueMarkdownEditor from "@kangc/v-md-editor";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import enUS from "@kangc/v-md-editor/lib/lang/en-US";
import "@kangc/v-md-editor/lib/theme/style/github.css";
// import githubTheme from "@kangc/v-md-editor/lib/theme/github";
import h17airwalkTheme from "@/utils/post-themes/default";
import { PostPreviewContent } from "@/components/post-preview";

const install = function(Vue) {
  VueMarkdownEditor.use(h17airwalkTheme);
  VueMarkdownEditor.lang.use("en-US", enUS);
  VMdPreview.use(h17airwalkTheme);
  PostPreviewContent.use(h17airwalkTheme);

  Vue.use(VueMarkdownEditor);
  Vue.use(VMdPreview);
};

export default {
  install
};
