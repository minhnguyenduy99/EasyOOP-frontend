<template>
  <div id="common-question-page">
    <admin-content :title="title" icon="clipboard" iconPack="fas">
      <template #action>
        <b-button
          type="is-primary"
          outlined
          @click="$on_openQuestionFormButtonClicked"
        >
          Tạo câu hỏi mới
        </b-button>
      </template>
      <div id="common-question-area">
        <div id="unused-tag-list" class="py-2 ha-vertical-layout-6">
          <div class="input-group ha-vertical-layout-7">
            <b-input
              class="is-flex-grow-1"
              v-model="tagSearch"
              @keyup.enter.native="$on_searchTags"
              icon="tags"
              placeholder="Tìm kiếm nhãn dán"
            />
            <b-button type="is-primary" @click.prevent="$on_searchTags"
              >Tìm kiếm</b-button
            >
          </div>
          <div class="buttons is-flex-grow-0">
            <b-button
              size="is-small"
              type="is-primary-light"
              class="px-2 py-5 has-text-left"
              outlined
              v-for="tag in unusedTags"
              :key="tag.id"
              @click="$on_tagClicked(tag)"
            >
              <span class="is-size-7 is-block">{{ tag.tag_id }}</span>
              <span class="has-text-weight-bold">{{ tag.tag_value }}</span>
            </b-button>
            <b-loading
              :is-full-page="false"
              v-model="isLoading"
              :can-cancel="true"
            ></b-loading>
          </div>
        </div>
        <hr class="is-hr" />
        <qanda-search @search="$on_search" />
        <qanda-table :search-options="searchOptions" class="mt-4" />
      </div>
    </admin-content>
    <b-modal v-model="showModal" has-modal-card>
      <create-question-form @submitted="$on_formSubmitted" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ToastNotifier } from "@/utils";
export default {
  name: "CommonQuestionPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "qanda-table": () => import("./qanda-table"),
    "create-question-form": () => import("./create-question.form"),
    "qanda-search": () => import("./qanda-search")
  },
  inject: ["$p_loadPage"],
  provide() {
    return {
      $api_findQuestions: this.searchQuestion
    };
  },
  data: () => ({
    title: "Danh sách câu hỏi",
    tagSearch: "",
    showModal: false,
    searchOptions: null,
    unusedTags: [],
    unusedTagsCount: 0,
    isLoading: false
  }),
  mounted: function() {
    this.getUnusedQuestionTags({}).then(result => {
      const { error, data } = result;
      if (error) {
        return;
      }
      const { count, results } = data;
      this.unusedTagsCount = count;
      this.unusedTags.push(...results);
    });
  },
  methods: {
    ...mapActions("QANDA", [
      "searchQuestion",
      "getUnusedQuestionTags",
      "searchUnusedTags"
    ]),

    $on_search(searchOptions) {
      this.searchOptions = { ...searchOptions };
    },
    $on_openQuestionFormButtonClicked() {
      this.showModal = true;
    },
    $on_formSubmitted(result) {
      const { success } = result;
      if (!success) {
        return;
      }
      this.showModal = false;
      this.$nextTick(() => {
        this.searchOptions = null;
      });
    },
    $on_searchTags() {
      this.$p_loadPage(true);
      this.searchUnusedTags({ search: this.tagSearch }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$p_loadPage(false);
        this.unusedTags.length = 0;
        this.unusedTags = data;
      });
    },
    $on_tagClicked(tag) {
      const textArea = document.createElement("textarea");
      textArea.value = tag.tag_id;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      ToastNotifier.success(this.$buefy.toast, "Sao chép nội dung tag");
    }
  }
};
</script>
