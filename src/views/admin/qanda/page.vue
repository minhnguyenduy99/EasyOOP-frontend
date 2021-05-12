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
        <qanda-search @search="$on_search" />
        <div id="unused-tag-list" class="py-2">
          <div class="has-text-grey mb-2">Nhãn dán có sẵn</div>
          <div class="buttons is-flex-grow-0">
            <b-button
              size="is-small"
              type="is-primary-light"
              outlined
              v-for="tag in unusedTags"
              :key="tag.tag_id"
              @click="$on_tagClicked(tag)"
            >
              <span class="has-text-weight-bold">{{ tag.tag_value }}</span>
            </b-button>
          </div>
        </div>
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
  provide() {
    return {
      $api_findQuestions: this.searchQuestion
    };
  },
  data: () => ({
    title: "Danh sách câu hỏi",
    showModal: false,
    searchOptions: null,
    unusedTags: [],
    unusedTagsCount: 0
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
    ...mapActions("QANDA", ["searchQuestion", "getUnusedQuestionTags"]),

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
