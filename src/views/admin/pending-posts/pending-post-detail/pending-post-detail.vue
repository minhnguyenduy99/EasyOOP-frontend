<template>
  <div class="pending-post-detail">
    <b-image
      ratio="16by9"
      class="pending-post-thumbnail"
      :src="post.thumbnail_file_url"
    />
    <div class="px-3 py-3">
      <div class="is-flex is-justify-content-space-between">
        <span class="is-size-5 has-text-weight-bold has-text-primary">{{
          post.post_title
        }}</span>
        <b-button
          v-if="isActive"
          class="is-icon-button"
          icon-right="pen"
          rounded
          outlined
          type="is-primary"
          size="is-small"
          tag="router-link"
          :to="{ name: 'EditPost', params: { post_id: post.post_id } }"
        />
      </div>
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
            :class="[
              'pending-post-field--value',
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
  name: "PendingPostDetail",
  mixins: [PostMixin],
  data: () => ({
    customInfo: {
      message: ""
    },
    isButtonLoading: false
  })
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
