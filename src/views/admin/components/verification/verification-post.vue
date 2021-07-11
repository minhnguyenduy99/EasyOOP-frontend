<template>
  <div class="verification-post">
    <div class="ha-overlay">
      <div class="ha-overlay-background" />
      <b-image
        ratio="16by9"
        class="ha-overlay-image verification-post__thumbnail"
        :src="post.thumbnail_file_url"
      />
      <div class="ha-overlay-content p-3">
        <div
          class="ha-vertical-layout-7 is-flex is-flex-direction-column is-align-items-flex-start"
        >
          <b-tooltip type="is-primary" label="Xem nội dung" position="is-right">
            <b-button
              class="is-block"
              icon-right="eye"
              type="is-primary"
              rounded
              size="is-small"
              @click="$emit('preview')"
            />
          </b-tooltip>
          <b-tooltip
            type="is-primary"
            :label="editTooltipText"
            position="is-right"
          >
            <b-button
              v-if="editable"
              class="is-block"
              icon-right="pen"
              type="is-primary"
              rounded
              size="is-small"
              tag="router-link"
              :to="{
                name: 'EditPost',
                params: { post_id: post.post_id },
                query: { is_pending: post.post_status !== 0 }
              }"
            />
          </b-tooltip>
        </div>
      </div>
    </div>
    <div class="px-3 py-3">
      <div>
        <span class="is-size-5 has-text-weight-bold has-text-primary">{{
          post.post_title
        }}</span>
      </div>
      <div class="py-3 ha-vertical-layout-7">
        <div class="field-info">
          <span class="field-info__label">ID bài viết</span>
          <span class="field-info__value">{{ post.post_id }}</span>
        </div>
        <div class="field-info">
          <span class="field-info__label">Chủ đề </span>
          <span class="field-info__value">{{ post.topic_title }}</span>
        </div>
        <div class="field-info">
          <span class="field-info__label">Ngày tạo</span>
          <span class="field-info__value">{{ createdDateInStr }}</span>
        </div>
        <div class="field-info">
          <span class="field-info__label">Nhãn dán</span>
          <b-taglist class="mt-1">
            <b-tag
              v-for="tag in post.tags"
              :key="tag.id"
              type="is-primary-dark"
              >{{ tag.tag_value }}</b-tag
            >
          </b-taglist>
        </div>
        <div class="field-info">
          <span class="field-info__label">Tình trạng</span>
          <span
            :class="[
              'field-info__value',
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
import PostMixin from "@/mixins/post.mixin";

export default {
  name: "VerificationPost",
  mixins: [PostMixin],
  props: {
    editable: {
      type: Boolean,
      default: () => true
    },
    editTooltipText: {
      type: String,
      default: () => "Chỉnh sửa"
    }
  },
  data: () => ({
    POST_STATUSES: {
      0: {
        color: "is-success",
        text: "Đã duyệt"
      },
      1: {
        color: "is-primary",
        text: "Chờ duyệt tạo"
      },
      2: {
        color: "is-primary",
        text: "Chờ duyệt cập nhật"
      },
      3: {
        color: "is-danger",
        text: "Chờ duyệt xóa"
      }
    }
  })
};
</script>

<style lang="scss">
@import "./field-info.scss";
</style>
