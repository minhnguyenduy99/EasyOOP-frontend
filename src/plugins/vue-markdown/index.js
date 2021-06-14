import VueMarkdownEditor from "@kangc/v-md-editor";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import enUS from "@kangc/v-md-editor/lib/lang/en-US";

const THEME_MAPPINGS = {
  default: "default",
  github: "github",
  vuepress: "vuepress"
};

const install = function(Vue) {
  useTheme("github");

  // install languae
  VueMarkdownEditor.lang.use("en-US", enUS);

  Vue.use(VueMarkdownEditor);
  Vue.use(VMdPreview);
};

function useTheme(theme) {
  const requireConfig = require(`./${THEME_MAPPINGS[theme]}.js`);

  requireConfig.default?.({
    VueMarkdownEditor,
    VMdPreview
  });
}

export default {
  install
};
