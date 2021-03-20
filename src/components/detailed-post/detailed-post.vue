<template>
  <div class="detailed-post">
    <div class="post-header ha-vertical-layout-4">
      <slot name="header" v-bind="{ post }">
        <div class="post-info-group ha-vertical-layout-6">
          <div class="post-info-group-item">
            <span class="post-group--label has-text-grey">Topic</span>
            <span class="post-group--value has-text-weight-bold">
              {{ post.topic_title }}
            </span>
          </div>
          <div class="post-info-group-item">
            <span class="post-group--label has-text-grey">Created date</span>
            <span class="post-group--value has-text-weight-bold">
              {{ createdDateInString }}
            </span>
          </div>
        </div>
        <hr class="is-hr" />
        <div class="post-preview-info--title">
          <span class="is-size-2-tablet is-size-3">{{ post.post_title }}</span>
        </div>
      </slot>
    </div>
    <div class="post-body mt-3">
      <slot v-bind="{ post }">
        <div v-html="postContent"></div>
      </slot>
    </div>
  </div>
</template>

<script>
import PostMixin from "./post.mixin";

export default {
  name: "DetailedPost",
  mixins: [PostMixin],
  data: () => ({
    postContent: ""
  }),
  created: function() {
    this.$m_readFileContent().then(content => {
      this.postContent = content;
    });
  }
};
</script>

<style scoped lang="scss">
.post-info-group {
  &-item {
    > span {
      display: block;
    }
  }
}

@include tablet {
  .post-group {
    &--label {
      font-size: $size-6;
    }
    &--value {
      font-size: $size-5;
    }
  }
}
</style>
