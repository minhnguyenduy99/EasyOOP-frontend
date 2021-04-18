<template>
  <div class="pending-post-detail">
    <b-image
      ratio="16by9"
      class="pending-post-thumbnail"
      :src="post.thumbnail_file_url"
    />
    <div class="px-3 py-5">
      <span class="is-size-5 has-text-weight-bold has-text-primary">{{
        post.post_title
      }}</span>
      <div class="py-3 ha-vertical-layout-7">
        <div class="pending-post-field">
          <span class="pending-post-field--label">Loại bài viết </span>
          <span class="pending-post-field--value">{{ post.post_type }}</span>
        </div>
        <div class="pending-post-field">
          <span class="pending-post-field--label">Chủ đề </span>
          <span class="pending-post-field--value">{{ post.topic_title }}</span>
        </div>
        <div class="pending-post-field">
          <span class="pending-post-field--label">Ngày tạo</span>
          <span class="pending-post-field--value">{{ createdDateInStr }}</span>
        </div>
        <div class="pending-post-field">
          <span class="pending-post-field--label">Tình trạng</span>
          <span
            class="pending-post-field--value has-text-danger has-text-weight-bold"
            >{{ postStatusText }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostMixin from "./mixins/post.mixin";

export default {
  name: "PendingPostDetail",
  mixins: [PostMixin]
};
</script>

<style scoped lang="scss">
.pending-post-field {
  display: flex;
  flex-direction: column;

  &--label {
    color: $grey;
  }
}
</style>
