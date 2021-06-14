<template>
  <div class="post-preview">
    <v-md-preview
      :text="tempPostContent"
      @copy-code-success="$on_copyCodeSuccess"
      ref="previewer"
    />
  </div>
</template>

<script>
import { xss } from "@kangc/v-md-editor";

export default {
  name: "PostPreview",
  props: {
    useUrl: {
      type: Boolean,
      default: () => true
    },
    postContent: String,
    contentUrl: String
  },
  data: () => ({
    tempPostContent: ""
  }),
  watch: {
    postContent() {
      this.$_updatePostContent();
    },
    contentUrl() {
      this.$_updatePostContent();
    }
  },
  mounted: function() {
    this.$_updatePostContent();
  },
  methods: {
    $convertToHtml() {
      return xss.process(
        this.$refs["previewer"].themeConfig.markdownParser.render(
          this.tempPostContent
        )
      );
    },
    $on_copyCodeSuccess() {
      this.$buefy.toast.open({
        message: "Sao chép code",
        type: "is-info",
        duration: 2000
      });
    },
    $_updatePostContent() {
      if (this.useUrl && this.contentUrl) {
        this.$_readFileContent();
        return;
      }
      this.tempPostContent = this.postContent ?? "";
      return;
    },
    $_readFileContent() {
      fetch(this.contentUrl)
        .then(response => response.text())
        .then(text => {
          this.tempPostContent = text;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.post-preview {
  margin: -1rem;
}
</style>
