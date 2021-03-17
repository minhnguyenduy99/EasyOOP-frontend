<template>
  <div class="post-preview">
    <div
      id="post-preview-detail"
      class="ha-vertical-layout-3 ha-vertical-layout-1-desktop"
    >
      <div class="post-preview-header ha-vertical-layout-4">
        <div
          class="post-preview-info-group ha-vertical-layout-5-mobile is-flex-tablet is-flex-wrap-nowrap"
        >
          <div class="post-preview-info-group--group-1 ha-vertical-layout-7">
            <div>
              <div class="has-text-grey">Topic</div>
              <div class="is-size-5">{{ post.topic_title }}</div>
            </div>
            <div>
              <div class="has-text-grey">Created date</div>
              <div class="is-size-5">{{ createdDateInString }}</div>
            </div>
          </div>
        </div>
        <div class="post-preview-info--title">
          <span
            class="has-text-weight-bold is-size-1-desktop is-size-2-tablet is-size-3"
            >{{ post.post_title }}</span
          >
        </div>
      </div>
      <post-preview-content
        ref="post-view"
        :content="postContent"
        @html-changed="$on_htmlChanged"
      ></post-preview-content>
    </div>
    <post-preview-index
      id="post-index"
      @index-clicked="$on_indexClicked"
      :html="htmlContent"
    />
  </div>
</template>

<script>
import PostMixin from "./post.mixin";

export default {
  name: "PostPreview",
  mixins: [PostMixin],
  components: {
    "post-preview-content": () => import("./post-preview-content"),
    "post-preview-index": () => import("./post-preview-index")
  },
  data: () => ({
    postContent: "",
    htmlContent: ""
  }),
  created: function() {
    this.$m_readFileContent().then(content => {
      this.postContent = content;
    });
  },
  methods: {
    $on_indexClicked(lineIndex) {
      this.$refs["post-view"].scrollToLine(lineIndex);
    },
    $on_htmlChanged(html) {
      console.log("post-preview: HTML changed");
      console.log(html[0] ?? html);
      this.htmlContent = html;
    }
  }
};
</script>

<style scoped lang="scss">
#post-preview-detail {
  @include tablet {
    .post-preview-info {
      &-group {
        &--group-1 {
          padding-right: 1.5rem;
          margin-right: 1.5rem;
          border-right: 1px solid grey;
          * {
            white-space: nowrap;
          }
        }
      }
    }
  }
}

.post-preview {
  display: flex;
  justify-content: space-between;
  position: relative;

  #post-preview-detail {
    flex-basis: 70%;
  }

  #post-index {
    position: sticky;
    height: fit-content;
    top: 0;
    flex-basis: 27%;
  }
}
</style>
