<template>
  <div id="common-question-table">
    <b-table
      :data="questions"
      paginated
      hoverable
      pagination-rounded
      :selected.sync="selectedQuestion"
      detailed
      anima
      detail-key="id"
      :has-detailed-visible="row => false"
      :show-detail-icon="false"
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
      <b-table-column label="ID" numeric width="20" centered>
        <template v-slot="{ row }">
          <strong>{{ row.id }}</strong>
        </template>
      </b-table-column>

      <b-table-column label="Câu hỏi" v-slot="{ row }">
        {{ row.question }}
      </b-table-column>

      <b-table-column label="Nhãn dán" width="200">
        <template v-slot="{ row }">
          <b-tag v-if="row.tag_id" type="is-primary-light">
            <span class="has-text-weight-bold">{{ row.tag_value }}</span>
          </b-tag>
          <span class="has-text-grey" v-else>Chưa có nhãn</span>
        </template>
      </b-table-column>

      <template #detail="props">
        <h1>
          {{ props.row.answer }}
        </h1>
        <hr />
        <section class="tooltip-section">
          <b-tooltip
            v-for="(feature, index) in features"
            position="is-left"
            :key="feature.id"
            :label="feature.tooltip"
            :type="feature.type"
          >
            <b-button
              class="is-icon-button"
              size="is-small"
              :icon-left="feature.icon"
              :type="feature.type"
              :outlined="feature.outlined"
              @click.stop="featureHandler[index](props.row)"
            />
          </b-tooltip>
        </section>
      </template>
      <template #empty>
        <empty-state image-src="#" text="Chưa có câu hỏi nào" />
      </template>
      <template #footer>
        <div>
          <span class="has-text-grey">Số lượng kết quả: </span>
          <span class="has-text-weight-bold">{{ totalCount }}</span>
        </div>
      </template>
    </b-table>

    <b-modal v-model="showModal" has-modal-card>
      <edit-question-form
        :question="selectedQuestion"
        @submitted="$on_formSubmitted"
      />
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "QandATable",
  components: {
    "edit-question-form": () => import("./edit-question.form"),
    "empty-state": () => import("@/components/empty-state.vue")
  },
  props: {
    searchOptions: Object
  },
  inject: ["$api_findQuestions"],
  data: () => ({
    itemsPerPage: 6,
    totalCount: 0,
    questions: [],
    selectedQuestion: null,
    features: [
      {
        icon: "pen",
        tooltip: "Chỉnh sửa câu hỏi",
        type: "is-primary",
        outlined: true
      }
    ],
    page: 1,
    featureHandler: [],
    showModal: false,
    loading: false,
    openedDetailedRows: []
  }),
  created: function() {
    this.featureHandler.push(this.$on_editButtonClicked);
    this.$_loadAsyncData();
  },
  computed: {
    selectedQuestionId() {
      return this.selectedQuestion?.id;
    },
    isRowSelected() {
      return this.selectedQuestion !== null;
    },
    _table() {
      return this.$refs.table;
    }
  },
  watch: {
    questions: function() {
      this.selectedQuestion = null;
    },
    searchOptions() {
      this.$_loadAsyncData();
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
      this.$api_findQuestions({
        page: this.page,
        ...this.searchOptions
      }).then(result => {
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
