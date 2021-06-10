import VueMarkdownEditor from "@kangc/v-md-editor";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import enUS from "@kangc/v-md-editor/lib/lang/en-US";

import createTipPlugin from "@kangc/v-md-editor/lib/plugins/tip/index";
import "@kangc/v-md-editor/lib/plugins/tip/tip.css";

import createHighlightLinesPlugin from "@kangc/v-md-editor/lib/plugins/highlight-lines/index";
import "@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css";

import { PostPreviewContent } from "@/components/post-preview";

const THEME_MAPPINGS = {
  default: "default",
  github: "github",
  vuepress: "vuepress"
};

const install = function(Vue) {
  useTheme("github");

  // install languae
  VueMarkdownEditor.lang.use("en-US", enUS);

  // install plugin for markdown
  installMarkdownPlugin();

  Vue.use(VueMarkdownEditor);
  Vue.use(VMdPreview);
};

function useTheme(theme) {
  const requireConfig = require(`./${THEME_MAPPINGS[theme]}.js`);

  requireConfig.default?.({
    VueMarkdownEditor,
    VMdPreview,
    PostPreviewContent
  });
}

function installMarkdownPlugin() {
  VueMarkdownEditor.use(createTipPlugin());
  VueMarkdownEditor.use(createHighlightLinesPlugin());
}

export default {
  install
};
