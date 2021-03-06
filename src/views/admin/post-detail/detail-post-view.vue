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
      <b-tooltip v-if="post.is_pending" label="Bài viết này đang chờ duyệt">
        <b-button
          type="is-primary"
          icon-left="pen"
          tag="router-link"
          :to="$_getEditPostViewRoute()"
          :disabled="post.is_pending"
          >Chỉnh sửa</b-button
        >
      </b-tooltip>
      <b-button
        v-else
        type="is-primary"
        icon-left="pen"
        tag="router-link"
        :to="$_getEditPostViewRoute()"
        :disabled="post.is_pending"
        >Chỉnh sửa</b-button
      >

      <b-button type="is-primary" icon-left="eye" @click="showPost = true"
        >Xem trước</b-button
      >
      <b-button
        type="is-danger"
        outlined
        icon-left="trash-alt"
        @click="$on_deleteButtonClicked"
        >Xóa</b-button
      >
    </div>
    <b-modal v-model="showPost" scroll="keep">
      <div class="card is-page-responsive py-6">
        <post-preview :contentUrl="post.content_file_url" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ToastNotifier } from "@/utils";

export default {
  components: {
    "post-preview": () => import("@/components/post-preview/post-preview.vue")
  },
  inject: ["$p_loadPage"],
  props: {
    post: Object
  },
  computed: {
    createDateInStr() {
      return new Date(this.post.created_date).toLocaleDateString("en-GB");
    },
    postURL() {
      return `${this.$appConfig.VUE_APP_HOST}/posts/${this.post.post_id}`;
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
    ...mapActions("POST", ["creator_deletePost"]),

    $on_deleteButtonClicked() {
      this.$buefy.dialog.confirm({
        title: "Xóa bài viết",
        message: "Bạn chắc chắc muốn xóa bài viết ?",
        confirmText: "Đồng ý",
        cancelText: "Hủy bỏ",
        type: "is-danger",
        onConfirm: () => {
          setTimeout(
            function() {
              this.$p_loadPage(true);
              this.creator_deletePost(this.post.post_id).then(result => {
                const { error, data } = result;
                this.$p_loadPage(false);
                if (error) {
                  const message = this.$serverLocaler.getMessage(
                    error.errorType
                  );
                  ToastNotifier.error(this.$buefy.toast, message);
                  return;
                }
                ToastNotifier.success(this.$buefy.toast, "Bài viết được xóa");
                this.$router.push({
                  name: "ListPosts"
                });
              });
            }.bind(this),
            500
          );
        }
      });
    },
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
