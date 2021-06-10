<template>
  <div :class="['post-view-detail', hasViewIndex ? 'has-index' : '']">
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
            <div class="post-info-group-item">
              <span class="post-group--label has-text-grey">Nhãn dán</span>
              <b-taglist class="mt-2">
                <b-tag
                  v-for="tag in listTagValues"
                  :key="tag.id"
                  type="is-primary-light"
                  >{{ tag }}</b-tag
                >
              </b-taglist>
            </div>
          </div>
          <slot v-if="trigger" name="trigger-header" v-bind="{ post }">
            <div class="is-flex is-flex-direction-column">
              <b-button
                v-if="_hasPreviousPost"
                class="mb-3"
                type="is-primary-light"
                icon-left="chevron-left"
                @click="$_navigate(post.previous_post_id)"
                >Bài trước</b-button
              >
              <b-button
                v-if="_hasNextPost"
                type="is-primary-light"
                icon-right="chevron-right"
                @click="$_navigate(post.next_post_id)"
                >Bài tiếp theo</b-button
              >
            </div>
          </slot>
        </div>
      </slot>
      <hr />
      <!-- <div class="post-title">
        <span class="is-size-2-tablet is-size-3">{{ post.post_title }}</span>
      </div> -->
      <!-- <post-preview-content
        ref="post-view"
        :content="postContent"
        @html-changed="$on_htmlChanged"
      ></post-preview-content> -->
      <post-preview
        v-if="post"
        ref="postPreview"
        :useUrl="false"
        :postContent="postContent"
      />
      <slot name="template">
        <div v-if="hasTemplate">
          <hr />
          <component
            v-for="template in templates"
            :key="template.id"
            :is="$_getComponentByType(template.type)"
            :editable="false"
            :template="template"
          />
        </div>
      </slot>
      <hr />
      <slot v-if="trigger" name="trigger" v-bind="{ post }">
        <div class="is-flex mt-3 is-justify-content-space-between">
          <b-button
            class="trigger-action--previous"
            v-if="_hasPreviousPost"
            type="is-primary-light"
            icon-left="chevron-left"
            @click="$_navigate(post.previous_post_id)"
            >Bài trước</b-button
          >
          <b-button
            v-if="_hasNextPost"
            class="trigger-action--next"
            type="is-primary-light"
            icon-right="chevron-right"
            @click="$_navigate(post.next_post_id)"
            >Bài tiếp theo</b-button
          >
        </div>
      </slot>
    </div>
    <div
      v-if="hasViewIndex"
      class="post-view-index-wrapper"
      :style="{ top: indexStickyTop }"
    >
      <post-preview-index
        anchorClass="index-anchor"
        :title="indexTitle"
        @index-clicked="$on_indexClicked"
        :html="htmlContent"
        :empty-text="$attrs['empty-text']"
        :allowLevels="indexLevels"
      />
    </div>
  </div>
</template>

<script>
import PostMixin from "./post.mixin";

const LINE_MARKUP = "data-v-md-line";

export default {
  name: "PostViewDetail",
  mixins: [PostMixin],
  components: {
    "post-preview-content": () => import("./post-preview-content"),
    "post-preview-index": () => import("./post-preview-index"),
    "test-template": () => import("./post-template/test-template"),
    "post-preview": () => import("./post-preview")
  },
  props: {
    indexTitle: String,
    hasViewIndex: {
      type: Boolean,
      default: () => false
    },
    indexStickyTop: {
      type: String,
      required: false,
      default: () => "0"
    },
    trigger: {
      type: Boolean,
      default: () => true
    },
    navigate: {
      type: Function,
      required: false
    },
    indexLevels: String
  },
  data: () => ({
    postContent: "",
    htmlContent: ""
  }),
  mounted: function() {
    this.$m_readFileContent().then(content => {
      this.postContent = content;
      this.$nextTick(() => {
        this.htmlContent = this.$refs.postPreview.$convertToHtml();
      });
    });
  },
  watch: {
    post(val) {
      if (!val) {
        return;
      }
      this.$m_readFileContent().then(content => {
        this.postContent = content;
        this.$nextTick(() => {
          this.htmlContent = this.$refs.postPreview.$convertToHtml();
        });
      });
    }
  },
  computed: {
    _hasPreviousPost() {
      return this.post?.previous_post_id;
    },
    _hasNextPost() {
      return this.post?.next_post_id;
    }
  },
  methods: {
    $on_indexClicked(lineIndex) {
      this.scrollToLine(lineIndex);
    },
    $on_htmlChanged(html) {
      this.htmlContent = html;
    },
    $_navigate(postId) {
      this.navigate?.(postId);
    },
    $_getComponentByType(type) {
      switch (type) {
        case "test":
          return "test-template";
      }
      return null;
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
</script>

<style scoped lang="scss">
.post-view-detail {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: stretch;

  .post-view-index-wrapper {
    display: none;
  }

  @include tablet {
    &.has-index {
      .post-view-index-wrapper {
        display: block;
      }
    }
  }

  @include desktop {
    display: grid;
    grid-template-columns: 1fr;

    &.has-index {
      column-gap: 2rem;
      grid-template-columns: 3fr 1fr;
    }

    .post-view-index-wrapper {
      display: block;
      position: sticky;
      height: fit-content;
      top: 0;
      right: 0;
    }

    .post-detail {
      grid-column: 1 / span 1;
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
