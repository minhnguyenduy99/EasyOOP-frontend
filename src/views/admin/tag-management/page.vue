<template>
  <div id="tag-management-page">
    <admin-content :title="title" icon="tags" iconPack="fas">
      <template #action>
        <b-button
          icon-left="tag"
          type="is-primary"
          outlined
          @click="openTagForm = true"
        >
          Thêm nhãn dán
        </b-button>
      </template>
      <div class="tag-search">
        <b-input
          icon="search"
          size="is-medium"
          class="tag-search__input is-flex-grow-1"
          v-model="tagSearch"
          placeholder="Tìm kiếm nhãn dán"
          @keyup.enter.native="$_searchTags"
        />
        <b-button
          class="tag-search__submit"
          size="is-medium"
          type="is-primary"
          @click="$_searchTags"
          >Tìm kiếm</b-button
        >
      </div>
      <div class="mt-5 ha-vertical-layout-3">
        <tag-list
          headerText="Nhãn dán câu hỏi"
          :tags="questionTags"
          :emptyText="emptyText"
          @tag-clicked="$on_selectTag"
        />
        <tag-list
          headerText="Nhãn dán bài học"
          :tags="postTags"
          :emptyText="emptyText"
          @tag-clicked="$on_selectTag"
        />
      </div>
    </admin-content>
    <b-modal v-model="openTagForm">
      <modal-form
        width="500px"
        :has-card="true"
        rounded
        title="Tạo nhãn dán"
        headerClass="has-background-primary-light has-text-white"
      >
        <tag-form @submit="$on_tagFormSubmitted" />
      </modal-form>
    </b-modal>
    <b-modal v-model="openEditTagForm">
      <edit-tag-form :tag="selectedTag" @submit="$on_editTagFormSubmit" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const TAG_TYPES = {
  question: "question",
  post: "post"
};

export default {
  name: "TagManagementPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "tag-list": () => import("@/components/tag-list.vue"),
    "modal-form": () => import("@/components/modal-form.vue"),
    "tag-form": () => import("./tag-form.vue"),
    "edit-tag-form": () => import("./edit-tag-form")
  },
  inject: ["$p_loadPage"],
  data: () => ({
    title: "Quản lí nhãn dán",
    emptyText: "Không có nhãn dán nào",
    openTagForm: false,
    openEditTagForm: false,
    tagSearch: "",
    questionTags: [],
    postTags: [],
    selectedTag: null
  }),
  mounted: function() {
    this.$_searchTags();
  },
  methods: {
    ...mapActions("TAG", [
      "createTags",
      "searchTag",
      "findTagById",
      "updateTag"
    ]),

    $on_selectTag(tag) {
      this.openEditTagForm = true;
      this.selectedTag = tag;
    },

    $on_tagFormSubmitted({ success, data }) {
      if (!success) {
        return;
      }
      this.openTagForm = false;
      this.createTags(data).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        const {
          data: { count, errors }
        } = data;
        this.$_searchTags();
        count > 0 &&
          this.$_notifyFormSubmitSuccess(
            `Tạo nhãn dán thành công.</br>Số lượng: <strong>${count}</strong>`
          );
        errors.length > 0 && this.$_notifyFormSubmitError(errors);
      });
    },

    $on_editTagFormSubmit({ success, data }) {
      if (!success) {
        return;
      }
      this.openEditTagForm = false;
      this.updateTag({ tag_id: data.tag_id, tag: data }).then(result => {
        const { error } = result;
        if (error) {
          return;
        }
        this.$_notifyFormSubmitSuccess("Cập nhật nhãn dán thành công");
        this.$_searchTags();
      });
    },

    $_searchTags() {
      this.$p_loadPage(true);
      this.searchTag({
        value: this.tagSearch
      }).then(result => {
        const { error, data } = result;
        this.$p_loadPage(false);
        if (error) {
          return;
        }
        this.$_updateTags(data);
      });
    },

    $_updateTags(tags) {
      this.postTags.length = this.questionTags.length = 0;
      this.postTags = [];
      this.questionTags = [];
      this.$nextTick(() => {
        tags.forEach(tag => {
          tag.tag_type === TAG_TYPES.question && this.questionTags.push(tag);
          tag.tag_type === TAG_TYPES.post && this.postTags.push(tag);
        });
      });
    },

    $_notifyFormSubmitSuccess(message) {
      this.$buefy.notification.open({
        duration: 1000,
        message,
        position: "is-bottom-right",
        type: "is-success"
      });
    },

    $_notifyFormSubmitError(errors) {
      errors.forEach(error => {
        this.$buefy.notification.open({
          duration: 1000,
          message: `Tạo nhãn dán thất bại. </br>ID: ${error.tag_id}`,
          position: "is-bottom-right",
          type: "is-danger",
          hasIcon: true
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.tag-search {
  @extend .input-group, .ha-vertical-layout-6;
}
</style>
