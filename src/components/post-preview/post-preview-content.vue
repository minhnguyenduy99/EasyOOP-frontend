<template>
  <div
    :class="['post-preview-content', themeConfig.previewClass]"
    @click.capture="handlePreviewClick"
  >
    <div v-html="html" />
    <!-- <v-md-image-preview
      v-show="previewImage"
      :src="previewImageSrc"
      :on-close="handleCloseImagePreview"
    /> -->
  </div>
</template>

<script>
import xss from "@kangc/v-md-editor/lib/utils/xss/index";
import VMdImagePreview from "@kangc/v-md-editor/src/components/image-preview";

const defaultMarkdownLoader = text => text;
const LINE_MARKUP = "data-v-md-line";

const component = {
  name: "post-preview-content",
  components: {
    [VMdImagePreview.name]: VMdImagePreview
  },
  props: {
    content: String
  },
  data: () => ({
    html: "",
    previewImageSrc: "",
    previewImage: false,
    contentIndex: {}
  }),
  watch: {
    content() {
      this.processMarkdownToHtml();
    },
    html(newVal) {
      this.$emit("html-changed", newVal);
    }
  },
  computed: {
    themeConfig() {
      return component.themeConfig || {};
    },
    markdownParser() {
      return this.themeConfig.markdownParser;
    },
    markdownLoader() {
      return (
        this.markdownParser?.render.bind(this.markdownParser) ||
        defaultMarkdownLoader
      );
    }
  },
  created() {
    if (this.theme) component.use(this.theme);

    if (
      typeof this.markdownLoader !== "function" ||
      this.markdownLoader === defaultMarkdownLoader
    ) {
      console.warn("Please configure your markdown parser");
    } else {
      const { markdownExtenders } = component;

      markdownExtenders.forEach(extender => {
        extender(this.markdownParser, () => this.langConfig);
      });
    }

    this.processMarkdownToHtml();
  },
  methods: {
    processMarkdownToHtml() {
      this.html = xss.process(this.markdownLoader(this.content));
    },
    handlePreviewClick(e) {
      const { target } = e;
      if (target.tagName === "IMG") {
        this.previewImage = true;
        this.previewImageSrc = target.src;
        e.stopPropagation();
      }
    },
    handleCloseImagePreview() {
      this.previewImageSrc = "";
      this.previewImage = false;
    },
    scrollToLine(lineIndex) {
      if (lineIndex) {
        const target = this.$el.querySelector(
          `[${LINE_MARKUP}="${lineIndex}"]`
        );

        if (target) this.scrollToTarget(target);
      }
    },
    scrollToTarget(target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
};

component.theme = function(themeConfig) {
  component.themeConfig = themeConfig;
};

component.markdownExtenders = [];
component.extendMarkdown = function(extend) {
  component.markdownExtenders.push(extend);
};

const install = Vue => {
  Vue.component(component.name, component);
};

component.install = install;
component.use = function(optionsOrInstall, opt) {
  if (typeof optionsOrInstall === "function") {
    optionsOrInstall(component, opt);
  } else {
    optionsOrInstall.install(component, opt);
  }

  return component;
};

export default component;
</script>

<style scoped lang="scss">
body {
  overflow: inherit;
}
</style>
