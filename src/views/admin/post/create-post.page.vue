<template>
  <div id="create-post-page">
    <admin-content :title="title" icon="pencil-alt" iconPack="fas">
      <create-post-form class="mb-5">
        <template #submit="{ form, validator }">
          <div id="submit-button-group">
            <b-button
              class="--submit"
              type="is-primary is-dark"
              @click="$on_submitForm(form, validator)"
              >Tạo mới</b-button
            >
            <b-button
              class="--preview"
              type="is-primary-light"
              outlined
              icon-left="eye"
              @click="$on_previewButtonClicked(form)"
              >Xem trước</b-button
            >
          </div>
        </template>
      </create-post-form>
      <v-md-editor v-model="postContent" height="600px"></v-md-editor>
    </admin-content>
    <b-modal v-model="showModal" scroll="keep">
      <div id="preview-container" class="card is-page-responsive py-6">
        <post-preview :post="post" />
      </div>
    </b-modal>
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false">
      <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin">
      </b-icon>
    </b-loading>
  </div>
</template>

<script>
import { tags, posts, topics } from "../data.mock";

import { AdminContent } from "../../../components";
import { FileReadHelper, ToastNotifier } from "../../../utils";

export default {
  name: "CreatePostPage",
  components: {
    AdminContent,
    "create-post-form": async () => await import("./create-post.form"),
    "post-preview": async () => (await import("@/components")).PostPreview
  },
  provide() {
    return {
      $api_findTopics: this.$mock_findTopics,
      $api_findPosts: this.$mock_findPosts,
      $api_findTags: this.$mock_findTags
    };
  },
  data: () => ({
    title: "Tạo bài viết mới",
    postContent: "",
    post: null,
    showModal: false,
    isLoading: false
  }),
  methods: {
    $on_previewButtonClicked(form) {
      console.log("preview button clicked");
      console.log(this.postContent[0]);
      this.showModal = true;
      this.post = {
        ...form,
        fullContent: this.postContent
      };
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
      console.log(data);
      this.$mock_createPost(data).then(result => {
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
            this.$router.push({ name: "Dashboard" });
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
    async $mock_createPost(data) {
      return {
        error: null
      };
    },
    async $mock_findTags(keyword, tagType) {
      return {
        data: tags
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
