<template>
  <div id="detail-post-view">
    <div class="adjacent-post-navigation">
      <div class="post-navigate">
        <router-link
          v-if="post.previous_post_id"
          :to="$_getPostDetailPageURL(post.previous_post_id)"
          >&lt;&lt; Bài viết trước</router-link
        >
      </div>
      <div class="post-navigate">
        <router-link
          v-if="post.next_post_id"
          :to="$_getPostDetailPageURL(post.next_post_id)"
          >Bài viết sau &gt;&gt;</router-link
        >
      </div>
    </div>
    <div class="py-4">
      <div class="post-title mb-5">
        <span class="is-size-4 has-text-weight-semibold">{{
          post.post_title
        }}</span>
      </div>
      <div class="post-detail-container ha-vertical-layout-6">
        <div class="post-view-left ha-vertical-layout-6">
          <div class="post-view-field--horizontal">
            <span class="post-view-field--label">ID bài viết: </span>
            <span class="post-view-field--value">{{ post.post_id }}</span>
          </div>
          <div class="post-view-field--horizontal">
            <span class="post-view-field--label">Ngày tạo</span>
            <span class="post-view-field--value">{{ createDateInStr }}</span>
          </div>
          <div class="post-view-field--horizontal">
            <span class="post-view-field--label">Chủ đề</span>
            <span class="post-view-field--value">{{ post.topic_title }}</span>
          </div>
          <div class="post-view-field--horizontal">
            <span class="post-view-field--label">Tình trạng: </span>
            <span
              :class="[
                'post-view-field--value',
                'has-text-weight-bold',
                isPostActive ? 'has-text-success' : 'has-text-warning'
              ]"
            >
              {{ postStatus }}
            </span>
          </div>
          <div class="post-view-field--horizontal">
            <span class="post-view-field--label">URL bài viết:</span>
            <span class="post-view-field--value">
              <a class="post-url" :href="postURL">{{ postURL }}</a>
            </span>
          </div>
        </div>
        <div class="post-view-right--horizontal">
          <div class="post-view-field">
            <span class="post-view-field--label">Ảnh bìa</span>
            <b-image
              class="post-thumbnail mt-3"
              :src="post.thumbnail_file_url"
              width="200px"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="post-view-actions py-3 ha-vertical-layout-tablet ha-vertical-layout-7"
    >
      <b-button
        type="is-primary"
        icon-left="pen"
        tag="router-link"
        :to="$_getEditPostViewRoute()"
        >Chỉnh sửa</b-button
      >
      <b-button type="is-primary" icon-left="eye" @click="showPost = true"
        >Xem trước</b-button
      >
      <b-button type="is-danger" outlined icon-left="trash-alt">Xóa</b-button>
    </div>
    <b-modal v-model="showPost" scroll="keep">
      <div class="card is-page-responsive py-6">
        <post-preview :post="post" :trigger="false" />
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  components: {
    "post-preview": () => import("@/components/post-preview/post-preview.vue")
  },
  props: {
    post: Object
  },
  computed: {
    createDateInStr() {
      return new Date(this.post.created_date).toLocaleDateString("en-US");
    },
    postURL() {
      return `http://localhost:8080/posts/${this.post.post_id}`;
    },
    isPostActive() {
      return this.post.post_status === 0;
    },
    postStatus() {
      switch (this.post.post_status) {
        case 0:
          return "Đã duyệt";
        case 1:
          return "Đang duyệt";
        default:
          return "Lỗi";
      }
    }
  },
  data: () => ({
    showPost: false
  }),
  methods: {
    $_getPostDetailPageURL(postId) {
      return {
        name: "AdminPostDetail",
        params: {
          post_id: postId
        }
      };
    },
    $_getEditPostViewRoute() {
      return {
        name: "EditPost",
        params: {
          post_id: this.post.post_id
        }
      };
    }
  }
};
</script>

<style scoped lang="scss">
.adjacent-post-navigation {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
}

.post-detail-container {
  @include tablet {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
}

.post-view-field {
  &--horizontal {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  &--label {
    font-weight: bold;
  }
}

.post-view-actions {
  display: flex;
  flex-direction: column;
  @include tablet {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: start;
    column-gap: 1rem;
  }
}

.post-thumbnail {
  @include tablet {
    max-width: 300px;
  }
}

a.post-url {
  text-decoration: underline;
}
</style>
