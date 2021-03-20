<template>
  <div class="post-preview">
    <div class="post-detail">
      <slot name="header" v-bind="{ post }">
        <div class="post-header is-flex is-justify-content-space-between">
          <div class="post-info-group ha-vertical-layout-6">
            <div class="post-info-group-item">
              <span class="post-group--label has-text-grey">Chủ đề</span>
              <span class="post-group--value has-text-weight-bold">
                {{ post.topic_title }}
              </span>
            </div>
            <div class="post-info-group-item">
              <span class="post-group--label has-text-grey">Ngày tạo</span>
              <span class="post-group--value has-text-weight-bold">
                {{ createdDateInString }}
              </span>
            </div>
          </div>
          <slot name="trigger-header" v-bind="{ post }">
            <div class="is-flex is-flex-direction-column">
              <b-button
                v-if="_hasPreviousPost"
                class="mb-3"
                type="is-primary-light"
                icon-left="chevron-left"
                @click="$_navigateToPost(post.previous_post_id)"
                >Bài trước</b-button
              >
              <b-button
                v-if="_hasNextPost"
                type="is-primary-light"
                icon-right="chevron-right"
                @click="$_navigateToPost(post.next_post_id)"
                >Bài tiếp theo</b-button
              >
            </div>
          </slot>
        </div>
      </slot>
      <hr />
      <div class="post-title">
        <span class="is-size-2-tablet is-size-3">{{ post.post_title }}</span>
      </div>
      <post-preview-content
        ref="post-view"
        :content="postContent"
        @html-changed="$on_htmlChanged"
      ></post-preview-content>
      <hr />
      <slot name="trigger" v-bind="{ post }">
        <div class="is-flex mt-3 is-justify-content-space-between">
          <b-button
            class="trigger-action--previous"
            v-if="_hasPreviousPost"
            type="is-primary-light"
            icon-left="chevron-left"
            @click="$_navigateToPost(post.previous_post_id)"
            >Bài trước</b-button
          >
          <b-button
            v-if="_hasNextPost"
            class="trigger-action--next"
            type="is-primary-light"
            icon-right="chevron-right"
            @click="$_navigateToPost(post.next_post_id)"
            >Bài tiếp theo</b-button
          >
        </div>
      </slot>
    </div>
    <post-preview-index
      :title="indexTitle"
      @index-clicked="$on_indexClicked"
      :html="htmlContent"
      ref="post-index"
      :style="{ top: indexStickyTop }"
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
  props: {
    indexTitle: String,
    indexStickyTop: {
      type: String,
      required: false,
      default: () => "0"
    }
  },
  data: () => ({
    postContent: "",
    htmlContent: ""
  }),
  mounted: function() {
    this.$m_readFileContent().then(content => {
      this.postContent = content;
    });
  },
  watch: {
    post(val) {
      if (!val) {
        return;
      }
      this.$m_readFileContent().then(content => {
        this.postContent = content;
      });
    }
  },
  computed: {
    _hasPreviousPost() {
      return this.post.previous_post_id !== null;
    },
    _hasNextPost() {
      return this.post.next_post_id !== null;
    }
  },
  methods: {
    $on_indexClicked(lineIndex) {
      this.$refs["post-view"].scrollToLine(lineIndex);
    },
    $on_htmlChanged(html) {
      this.htmlContent = html;
    },
    $_navigateToPost(postId) {
      this.$router.push({
        name: "PostDetail",
        params: { post_id: postId }
      });
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

  .post-preview-index {
    display: none;
  }

  @include tablet {
    .post-detail {
      flex-basis: 70%;
    }

    .post-preview-index {
      display: block;
      position: sticky;
      height: fit-content;
      top: 0;
      flex-basis: 27%;
    }
  }

  @include desktop {
    .post-detail {
      flex-basis: 75%;
    }

    .post-preview-index {
      flex-basis: 22%;
    }
  }
}

.post-info-group {
  &-item {
    > span {
      display: block;
    }
  }

  @include tablet {
    &--label {
      font-size: $size-6;
    }
    &--value {
      font-size: $size-5;
    }
  }
}

.trigger-action {
  &--previous {
    margin-left: 0;
  }

  &--next {
    margin-left: auto;
  }
}
</style>
