<template>
  <div
    :class="{
      'pending-post': true,
      card: true,
      'is-selected': selected
    }"
    @click="$on_postClicked"
  >
    <div class="card-image">
      <b-image
        ratio="16by12"
        class="pending-post-thumbnail"
        :src="post.thumbnail_file_url"
      />
      <div
        :class="{
          'pending-post-actions': true,
          'is-check-mode': selected || checkMode
        }"
      >
        <div class="is-flex is-justify-content-space-between">
          <b-button
            @click.stop="isChecked = !isChecked"
            :class="{
              'is-icon-button': true,
              'is-outlined': !isChecked
            }"
            type="is-primary-light"
            icon-right="check"
            rounded
            selected
            size="is-small"
            ref="selectButton"
          />
          <div class="buttons">
            <b-button
              class="is-icon-button"
              type="is-primary-light"
              icon-right="eye"
              size="is-small"
              rounded
              @click.stop="showPost = true"
            />
            <b-button
              class="is-icon-button"
              type="is-danger"
              icon-right="trash"
              size="is-small"
              rounded
            />
          </div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <span class="is-size-6 has-text-weight-bold has-text-primary">{{
        post.post_title
      }}</span>
      <!-- <div class="pending-post-detail">
        <div class="pending-post-field">
          <span class="pending-post-field--label">Loại bài viết </span>
          <span class="pending-post-field--value">{{ post.post_type }}</span>
        </div>
        <div class="pending-post-field">
          <span class="pending-post-field--label">Chủ đề </span>
          <span class="pending-post-field--value">{{ post.topic_title }}</span>
        </div>
      </div> -->
    </div>
    <div class="card-footer">
      <span class="is-size-7 is-italic">{{ createdDateInStr }}</span>
      <span class="is-size-7 has-text-weight-bold mt-2 has-text-danger">{{
        postStatusText
      }}</span>
    </div>
    <b-modal v-model="showPost" scroll="keep">
      <div class="card is-page-responsive py-6">
        <post-preview :post="post" :trigger="false" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import PostMixin from "./mixins/post.mixin";

export default {
  name: "PendingPost",
  components: {
    "post-preview": () => import("@/components/post-preview/post-preview.vue")
  },
  mixins: [PostMixin],
  props: {
    checkMode: {
      type: Boolean,
      required: false,
      default: () => false
    },
    selected: Boolean
  },
  data: () => ({
    isChecked: false,
    showPost: false
  }),
  watch: {
    isChecked(val) {
      this.$emit("check", val);
    }
  },
  methods: {
    $on_postClicked() {
      this.$emit("select", !this.selected);
    }
  }
};
</script>

<style scoped lang="scss">
$card-content-padding: 0.5rem;
$card-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
  rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

.pending-post {
  border: 2px solid transparent;
  &:hover {
    .pending-post-actions {
      opacity: 1;
    }
  }

  &.is-selected {
    box-shadow: $card-shadow;
    border-color: $primary-dark;
  }
}

.pending-post-detail {
  display: flex;
  flex-direction: column;
  box-shadow: none;

  > .pending-post-field {
    padding: 0.25rem 0;
  }
}

.pending-post-actions {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: fit-content;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.1s ease;
  opacity: 0;

  &.is-check-mode {
    opacity: 1;
  }
}

.pending-post-field {
  display: flex;
  justify-content: space-between;
  font-size: $size-7;

  & > &--value {
    color: $grey;
  }
}

.card {
  box-shadow: none;
  transition: 0.1s ease-in;
  cursor: pointer;

  &:hover {
    box-shadow: $card-shadow;
  }

  & > &-image {
    position: relative;
  }

  & > &-content {
    padding: $card-content-padding;
  }

  & > &-footer {
    flex-direction: column;
    padding: $card-content-padding;
  }
}
</style>
