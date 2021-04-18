<template>
  <div id="common-question-page">
    <admin-content>
      <template #header>
        <admin-content-header :title="title" icon="clipboard" iconPack="fas">
          <template #action>
            <b-button
              type="is-primary"
              outlined
              @click="$on_openQuestionFormButtonClicked"
            >
              Tạo câu hỏi mới
            </b-button>
          </template>
        </admin-content-header>
      </template>
      <div id="common-question-area">
        <div id="common-question-search">
          <b-input
            placeholder="Tìm kiếm câu hỏi"
            type="is-primary"
            icon="search"
            v-model="search"
            @keyup.enter.native="$on_search"
          />
          <b-button type="is-primary" @click="$on_search">Tìm kiếm</b-button>
        </div>
        <common-question-table
          v-model="searching"
          :search="search"
          class="mt-4"
        />
      </div>
    </admin-content>
    <b-modal v-model="showModal" has-modal-card>
      <div class="modal-content card">
        <div class="card-content ha-vertical-layout-5">
          <create-question-form @submitted="$on_formSubmitted" />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
const questions = [
  {
    qa_id: "question_id",
    question: "Cách học OOP hiệu quả ?",
    answer: "Cách học OOP hiệu quả",
    tag: "Tag A"
  },
  {
    qa_id: "question_id",
    question: "Cách học OOP hiệu quả ?",
    answer: "Cách học OOP hiệu quả",
    tag: "Tag A"
  },
  {
    qa_id: "question_id",
    question: "Cách học OOP hiệu quả ?",
    answer: "Cách học OOP hiệu quả",
    tag: "Tag B"
  },
  {
    qa_id: "question_id",
    question: "Cách học OOP hiệu quả ?",
    answer: "Cách học OOP hiệu quả",
    tag: "Tag C"
  }
];

const tags = [
  {
    tag_id: "tagida",
    tag_value: "tag A"
  },
  {
    tag_id: "tagidb",
    tag_value: "tag B"
  },
  {
    tag_id: "tagidc",
    tag_value: "tag C"
  }
];

export default {
  name: "CommonQuestionPage",
  components: {
    "admin-content": () => import("../components/admin-content/admin-content.vue"),
    "admin-content-header": () => import("../components/admin-content/admin-content-header.vue"),
    "common-question-table": () => import("./common-question.table"),
    "create-question-form": () => import("./create-question.form")
  },
  provide() {
    return {
      $api_findQuestions: this.$mock_findQuestions,
      $api_deleteQuestion: this.$mock_deleteQuestion,
      $api_updateQuestion: this.$mock_updateQuestion,
      $api_createQuestion: this.$mock_createQuestion,
      $api_findTags: this.$mock_findTags
    };
  },
  data: () => ({
    search: "",
    title: "Danh sách câu hỏi",
    searching: false,
    showModal: false
  }),
  methods: {
    $on_search() {
      this.searching = true;
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
        this.search = "";
        this.searching = true;
      });
    },
    $mock_findQuestions(page, search = null) {
      return new Promise(resolve => {
        setTimeout(
          function() {
            resolve({
              data: {
                total_count: 10,
                results: questions
              }
            });
          }.bind(this),
          1000
        );
      });
    },
    async $mock_deleteQuestion(questionId) {
      return {
        error: null
      };
    },
    async $mock_updateQuestion(questionId, data) {
      return {
        error: null
      };
    },
    async $mock_createQuestion(data) {
      return {
        error: null
      };
    },
    async $mock_findTags(keyword, tagType) {
      return {
        data: tags
      };
    }
  }
};
</script>

<style scoped lang="scss">
#common-question-search {
  > .control:first-child {
    margin-bottom: 1rem;
  }

  @include tablet {
    display: flex;

    > .control:first-child {
      margin-bottom: 0;
      margin-right: 1rem;
    }
  }
}
</style>
