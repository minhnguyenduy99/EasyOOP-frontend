<template>
  <div id="create-post-page">
    <admin-content :title="title" icon="pencil-alt" iconPack="fas">
      <breadcrumb v-if="initialPost" :titles="breadcumbInfo" :active="2" />
      <edit-post-form v-if="initialPost" :post="initialPost" class="mb-5">
        <template #submit="{ form, detailedForm, validator }">
          <div id="submit-button-group">
            <b-button
              class="--submit"
              type="is-primary is-dark"
              @click="$on_submitForm(form, validator)"
              >Cập nhật</b-button
            >
            <b-button
              class="--preview"
              type="is-primary-dark"
              outlined
              icon-left="eye"
              @click="$on_previewButtonClicked(detailedForm)"
              >Xem trước</b-button
            >
          </div>
        </template>
      </edit-post-form>
      <v-md-editor v-model="postContent" height="600px"></v-md-editor>
    </admin-content>
    <b-modal v-model="showModal" scroll="keep">
      <div id="preview-container" class="card is-page-responsive py-6">
        <post-preview :useUrl="false" :postContent="postContent" />
      </div>
    </b-modal>
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false">
      <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin">
      </b-icon>
    </b-loading>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { tags, posts, topics } from "../data.mock";
import { FileReadHelper, ToastNotifier } from "../../../utils";

export default {
  name: "EditPostPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "edit-post-form": () => import("./edit-post.form"),
    "post-preview": () => import("@/components/post-preview/post-preview.vue"),
    breadcrumb: () => import("@/components/base/breadcrumb.vue")
  },
  metaInfo() {
    const title = `${this.initialPost?.post_title} | Cập nhật bài viết - ${this.$appConfig.VUE_APP_NAME}`;
    return {
      title
    };
  },
  props: {
    postId: String
  },
  provide() {
    return {
      $api_findTopics: this.creator_getAvailableTopics,
      $api_findPosts: this.getPosts,
      $api_findTags: this.searchPostTags
    };
  },
  data: () => ({
    title: "Cập nhật bài viết",
    postContent: "",
    post: null,
    showModal: false,
    isLoading: false,
    initialPost: null
  }),
  mounted: function() {
    this.getPostById(this.postId).then(result => {
      const { error, data } = result;
      if (error) {
        return;
      }
      this.initialPost = data;
    });
  },
  watch: {
    initialPost: function(val) {
      if (!val) {
        return;
      }
      fetch(val.content_file_url)
        .then(res => res.text())
        .then(value => {
          this.postContent = value;
        });
    }
  },
  computed: {
    breadcumbInfo() {
      return [
        {
          value: "Bài viết",
          to: {
            name: "ListPosts"
          }
        },
        {
          value: this.initialPost.post_title,
          to: {
            name: "AdminPostDetail",
            params: {
              post_id: this.initialPost.post_id
            }
          }
        },
        {
          value: "Cập nhật"
        }
      ];
    }
  },
  methods: {
    ...mapActions("POST", [
      "getPostById",
      "creator_getAvailableTopics",
      "searchPostTags",
      "getPosts",
      "creator_updatePost"
    ]),
    $on_previewButtonClicked(detailedForm) {
      this.showModal = true;
      detailedForm.fullContent = this.postContent;
      this.post = detailedForm;
    },
    async $on_submitForm(form, validator) {
      if (!this.postContent) {
        ToastNotifier.error(this.$buefy.toast, "Nội dung không thể trống");
        return;
      }
      const valid = await validator.validate();
      if (!valid) {
        return;
      }
      this.isLoading = true;
      const data = this.$_sanitizeFormData(form);
      this.creator_updatePost({
        postId: this.postId,
        data
      }).then(result => {
        const { error } = result;
        this.isLoading = false;
        if (error) {
          this.validator.setErrors({
            general: [error]
          });
          return;
        }
        ToastNotifier.success(this.$buefy.toast, "Tạo bài viết thành công");
        setTimeout(
          function() {
            this.$router.push({ name: "ListPosts" });
          }.bind(this),
          1000
        );
      });
    },
    async $mock_findTopics() {
      return {
        data: topics
      };
    },
    async $mock_findPosts() {
      return {
        data: {
          results: posts
        }
      };
    },
    async $mock_editPost(postId, data) {
      return {
        error: null
      };
    },
    async $mock_findTags(keyword, tagType) {
      return {
        data: tags
      };
    },
    async $mock_getPostById(postId) {
      return {
        data: posts[0]
      };
    },
    $_sanitizeFormData(form) {
      const fileName = `${form.post_title.replace(" ", "_")}_${Date.now()}`;
      const contentFile = FileReadHelper.toFileFromObject(
        this.postContent,
        fileName
      );
      const data = {
        ...form,
        content_file: contentFile
      };
      return data;
    }
  }
};
</script>

<style scoped lang="scss">
#submit-button-group {
  .button {
    width: 100%;

    &.--submit {
      margin-bottom: 1rem;
    }
  }

  @include tablet {
    display: flex;

    .button {
      width: auto;
      &.--submit {
        margin-bottom: 0;
        margin-right: 1rem;
      }
    }
  }
}

#preview-container {
  position: relative;
}
</style>
