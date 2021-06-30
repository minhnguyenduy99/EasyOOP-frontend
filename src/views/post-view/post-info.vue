<template>
  <div
    class="post-info is-flex is-flex-direction-column is-justify-content-center"
  >
    <div class="columns post-info__container">
      <div class="column is-half is-0-mobile">
        <div class="post-info__topic">
          <img class="post-info__topic__thumbnail" :src="topicThumbnailImage" />
        </div>
      </div>
      <div
        class="column is-two-fifths-desktop is-full-mobile ha-vertical-layout-6"
      >
        <div class="post-info__group">
          <p class="post-info__group__label">Tên bài viết</p>
          <p class="post-info__group__value">{{ post.post_title }}</p>
        </div>
        <div class="post-info__group">
          <p class="post-info__group__label">Ngày tạo</p>
          <p class="post-info__group__value">{{ createdDateInString }}</p>
        </div>
        <div class="post-info__group">
          <p class="post-info__group__label">Nhãn dán</p>
          <b-taglist class="post-info__group__taglist mt-2">
            <b-tag
              v-for="tag in post.tags"
              :key="tag.id"
              size="is-medium"
              rounded
              type="is-primary-dark"
              >{{ tag.tag_value }}</b-tag
            >
          </b-taglist>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostInfo",
  props: {
    post: Object,
    topicThumbnailImage: String
  },
  computed: {
    createdDateInString() {
      return new Date(this.post.created_date).toLocaleDateString("en-GB");
    }
  }
};
</script>

<style scoped lang="scss">
.post-info {
  min-height: 350px;
  border-radius: 1000px;
  position: relative;
  background-image: linear-gradient(to right, $primary 0%, $primary-light 100%);
  padding: 2rem 0;

  &__title {
    font-size: 4rem;
    font-weight: bold;
    color: white;
  }
}
.post-info__group {
  text-align: center;
  &__label {
    color: white;
    font-style: italic;
    margin-bottom: 7px;
  }

  &__value {
    @extend .has-text-weight-extra-bold;
    color: black;
    font-size: $size-4;
  }

  &__taglist {
    justify-content: center;
  }

  @include tablet {
    text-align: left;

    &__taglist {
      justify-content: flex-start;
    }
    &--label {
      font-size: $size-6;
    }
    &--value {
      font-size: $size-5;
    }
  }
}

.post-info__topic {
  position: relative;

  &__thumbnail {
    position: absolute;
    top: -1.5rem;
    left: calc(30%);
    width: auto;
    height: 350px;
  }
}
</style>
