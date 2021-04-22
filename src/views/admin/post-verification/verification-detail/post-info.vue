<template>
  <div class="post-info">
    <b-image
      ratio="16by9"
      class="info-thumbnail"
      :src="post.thumbnail_file_url"
    />
    <div class="px-3 py-3">
      <div>
        <span class="is-size-5 has-text-weight-bold has-text-primary">{{
          post.post_title
        }}</span>
      </div>
      <div class="py-3 ha-vertical-layout-7">
        <div class="info-field">
          <span class="info-field--label">Loại bài viết </span>
          <span class="info-field--value">{{ post.post_type }}</span>
        </div>
        <div class="info-field">
          <span class="info-field--label">Chủ đề </span>
          <span class="info-field--value">{{ post.topic_title }}</span>
        </div>
        <div class="info-field">
          <span class="info-field--label">Ngày tạo</span>
          <span class="info-field--value">{{ createdDateInStr }}</span>
        </div>
        <div class="info-field">
          <span class="info-field--label">Tình trạng</span>
          <span
            :class="[
              'info-field--value',
              'has-text-weight-bold',
              postStatus.color
            ]"
            >{{ postStatus.text }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostMixin from "../mixins/post.mixin";

export default {
  name: "PostInfo",
  mixins: [PostMixin]
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
