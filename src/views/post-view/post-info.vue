<template>
  <div class="post-info">
    <div>
      <p class="post-info__title">{{ post.post_title }}</p>
      <hr class="is-hr" />
    </div>
    <div class="card">
      <div class="card-content">
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
                v-for="tag in post.tags"
                :key="tag.id"
                type="is-primary-light"
                >{{ tag.tag_value }}</b-tag
              >
            </b-taglist>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostInfo",
  props: {
    post: Object
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
  font-family: "Montserrat", sans-serif;
  &__title {
    font-size: 4rem;
    font-weight: bold;
    color: white;
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
</style>
