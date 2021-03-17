<template>
  <div id="common-question-table">
    <b-table
      :data="questions"
      paginated
      hoverable
      pagination-rounded
      :selected.sync="selectedQuestion"
      detailed
      detail-key="id"
      :show-detail-icon="true"
      :loading="loading"
      pagination-size="is-small"
      :per-page="itemsPerPage"
      :total="totalCount"
      backend-pagination
      :row-class="(row, index) => 'is-clickable'"
      @page-change="$on_pageChanged"
      @click="$on_rowClicked"
      ref="table"
    >
      <b-table-column label="ID" width="50px" numeric centered>
        <template v-slot="{ row }">
          <strong>{{ row.id }}</strong>
        </template>
      </b-table-column>

      <b-table-column label="Câu hỏi" width="300" v-slot="{ row }">
        {{ row.question }}
      </b-table-column>

      <b-table-column label="Nhãn dán" width="300">
        <template v-slot="{ row }">
          <b-tag type="is-primary-light">{{ row.tag }}</b-tag>
        </template>
      </b-table-column>

      <template #detail="props">
        <h1>
          {{ props.row.answer }}
        </h1>
        <hr />
        <section
          class="tooltip-section"
          style="margin-top: -4px; margin-bottom: -6px"
        >
          <b-tooltip
            v-for="(feature, index) in features"
            :key="feature.id"
            :label="feature.tooltip"
            :type="feature.type"
          >
            <b-button
              size="is-small"
              :icon-left="feature.icon"
              :type="feature.type"
              :outlined="feature.outlined"
              @click.stop="featureHandler[index](props.row)"
            />
          </b-tooltip>
        </section>
      </template>
      <template #footer>
        <div>
          <span class="has-text-grey">Total results: </span>
          <span class="has-text-weight-bold">{{ totalCount }}</span>
        </div>
      </template>
    </b-table>
    <b-modal v-model="showModal" has-modal-card>
      <div class="modal-content card">
        <div class="card-content ha-vertical-layout-5">
          <edit-question-form
            :question="selectedQuestion"
            @submitted="$on_formSubmitted"
          />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { ToastNotifier } from "../../../utils";

export default {
  name: "CommonQuestionTable",
  components: {
    "edit-question-form": () => import("./edit-question.form")
  },
  props: {
    searching: {
      type: Boolean,
      default: () => false
    }
  },
  inject: ["$api_findQuestions", "$api_deleteQuestion"],
  model: {
    prop: "searching",
    event: "table-searching"
  },
  data: () => ({
    itemsPerPage: 6,
    totalCount: 0,
    questions: [],
    selectedQuestion: null,
    features: [
      {
        icon: "pen",
        tooltip: "Edit post",
        type: "is-primary",
        outlined: true
      },
      {
        icon: "trash-alt",
        tooltip: "Delete post",
        type: "is-danger",
        outlined: false
      }
    ],
    page: 1,
    featureHandler: [],
    showModal: false,
    loading: false,
    openedDetailedRows: []
  }),
  created: function() {
    this.featureHandler.push(
      this.$on_editButtonClicked,
      this.$on_deleteButtonClicked
    );
    this.$_loadAsyncData();
  },
  computed: {
    selectedQuestionId() {
      return this.selectedQuestion?.id;
    },
    isRowSelected() {
      return this.selectedQuestion !== null;
    },
    _searching: {
      get() {
        return this.searching;
      },
      set(val) {
        this.$emit("table-searching", val);
      }
    },
    _table() {
      return this.$refs.table;
    }
  },
  watch: {
    searching: function(newVal) {
      if (newVal) {
        this.$_loadAsyncData();
        return;
      }
    },
    questions: function() {
      this.selectedQuestion = null;
    }
  },
  methods: {
    $on_rowClicked(row) {
      this._table.closeDetailRow(row);
      if (this.selectedQuestionId === row.id) {
        this.selectedQuestion = null;
        return;
      }
      this._table.openDetailRow(row);
    },
    $on_pageChanged(page) {
      this.page = page;
      this.$_loadAsyncData();
    },
    $on_formSubmitted(result) {
      const { success } = result;
      if (!success) {
        return;
      }
      this.showModal = false;
      this.$nextTick(() => {
        this.$_loadAsyncData();
      });
    },
    async $_loadAsyncData() {
      this.loading = true;
      this.$api_findQuestions(this.page).then(result => {
        const { error, data } = result;
        this.loading = this._searching = false;
        this.$_resetTableState();
        if (error) {
          return;
        }
        this.$_updateData(data);
      });
    },
    $_updateData(data) {
      const { total_count, results } = data;
      this.totalCount = total_count;
      this.questions.length = 0;
      this.questions.push(
        ...results.map((result, index) => {
          result.id = index + 1;
          return result;
        })
      );
    },
    $on_editButtonClicked() {
      this.showModal = true;
    },
    $on_deleteButtonClicked() {
      const questionId = this.selectedQuestion?.qa_id;
      if (!questionId) {
        return;
      }
      this.$buefy.dialog.confirm({
        title: "Xóa câu hỏi",
        message: "Bạn chắc chắc muốn xóa câu hỏi ?",
        confirmText: "Đồng ý",
        cancelText: "Hủy bỏ",
        type: "is-danger",
        onConfirm: () =>
          setTimeout(
            function() {
              this.loading = true;
              this.$api_deleteQuestion(questionId).then(result => {
                const { error } = result;
                this.loading = false;
                if (error) {
                  ToastNotifier.error(
                    this.$buefy.toast,
                    "Xóa câu hỏi thất bại"
                  );
                  return;
                }
                ToastNotifier.success(
                  this.$buefy.toast,
                  "Xóa câu hỏi thành công"
                );
              });
            }.bind(this),
            500
          )
      });
    },
    $_resetTableState() {
      if (this.selectedQuestion) {
        this._table.closeDetailRow(this.selectedQuestion);
      }
      this.selectedQuestion = null;
    },
    $_removeQuestionFromTable(questionId) {
      this.questions = this.questions.filter(q => q.qa_id !== questionId);
      this.totalCount--;
    }
  }
};
</script>

<style scoped lang="scss">
.custom-table-header {
  border-top: none;
  border-left: none;
  border-right: none;
}

.b-table {
  td.chevron-cell {
    width: 50px;
  }
}

.custom-row-class {
  &:hover {
    cursor: pointer;
  }
}

.tooltip-section {
  display: flex;
  justify-content: flex-end;
  .b-tooltip {
    margin-bottom: 0.5rem;

    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
}
</style>
