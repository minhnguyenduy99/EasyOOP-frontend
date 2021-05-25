<template>
  <div id="list-test-table">
    <b-table
      :data="tests"
      paginated
      hoverable
      pagination-rounded
      :selected.sync="selectedTest"
      :loading="loading"
      pagination-size="is-small"
      :per-page="itemsPerPage"
      :total="totalCount"
      backend-pagination
      :row-class="(row, index) => 'is-clickable row--middle'"
      @page-change="$on_pageChanged"
      @click="$on_rowClicked"
      backend-sorting
      @sort="$on_sort"
      ref="table"
    >
      <b-table-column
        label="STT"
        numeric
        centered
        width="20"
        header-class="has-text-left"
      >
        <template v-slot="{ index }">
          <strong>{{ index + 1 }}</strong>
        </template>
      </b-table-column>

      <b-table-column label="Tên bài test" width="300" v-slot="{ row }">
        <span class="is-size-6">
          {{ row.title }}
        </span>
      </b-table-column>

      <b-table-column label="Loại" sortable centered width="100px" field="type">
        <template v-slot="{ row }">
          <b-tooltip :label="TEST_TYPE[row.type].text" type="is-black">
            <b-icon
              :icon="TEST_TYPE[row.type].icon"
              :type="TEST_TYPE[row.type].type"
            />
          </b-tooltip>
        </template>
      </b-table-column>

      <b-table-column label="Số lượng" v-slot="{ row }" numeric width="100px">
        <span class="has-text-weight-bold has-text-primary-dark">{{
          row.list_sentence_ids.length
        }}</span>
      </b-table-column>

      <b-table-column
        label="Tình trạng"
        centered
        sortable
        width="120px"
        field="verifying_status"
      >
        <template v-slot="{ row }">
          <b-tag
            :type="TEST_STATUSES[row.verifying_status].type"
            size="is-small"
          >
            <span class="has-text-weight-bold is-size-7">{{
              TEST_STATUSES[row.verifying_status].title
            }}</span>
          </b-tag>
        </template>
      </b-table-column>

      <b-table-column
        label="Ngày tạo"
        v-slot="{ row }"
        sortable
        centered
        field="created_date"
        width="120px"
      >
        <span>
          {{ new Date(row.created_date).toLocaleDateString("en-GB") }}
        </span>
      </b-table-column>

      <b-table-column
        :visible="isRowSelected"
        label="Lựa chọn"
        width="120px"
        centered
        v-slot="{ row }"
      >
        <template v-if="selectedTestId === row.test_id">
          <section
            class="tooltip-section"
            style="margin-top: -4px; margin-bottom: -6px"
          >
            <b-tooltip
              v-for="(feature, index) in testFeatures"
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
                @click.stop="testFeatureHandlers[index]"
              />
            </b-tooltip>
          </section>
        </template>
      </b-table-column>

      <template #footer>
        <div>
          <span class="has-text-grey">Total results: </span>
          <span class="has-text-weight-bold">{{ totalCount }}</span>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ListTestTable",
  props: {
    searchOptions: Object
  },
  inject: ["$api_searchTests"],
  data: () => ({
    TEST_TYPE: [
      {},
      {
        icon: "hourglass-start",
        text: "Giới hạn thời gian",
        type: "is-danger"
      },
      {
        icon: "calendar-times",
        text: "Không giới hạn thời gian",
        type: "is-primary-light"
      }
    ],
    TEST_STATUSES: [
      {},
      {
        icon: "check",
        type: "is-success",
        title: "Đã duyệt"
      },
      {
        icon: "minus",
        type: "is-danger",
        title: "Không được duyệt"
      },
      {
        icon: "pause-circle",
        type: "is-primary-light",
        title: "Chờ duyệt"
      }
    ],
    itemsPerPage: 10,
    totalCount: 0,
    tests: [],
    selectedTest: null,
    features: [
      {
        icon: "pen",
        tooltip: "Edit test",
        type: "is-primary",
        outlined: true
      }
    ],
    page: 1,
    featureHandler: [],
    showModal: false,
    loading: false,
    openedDetailedRows: [],
    sortOptions: {
      sort_by: null,
      sort_order: null
    },
    testFeatures: [
      {
        icon: "spell-check",
        tooltip: "Làm thử",
        type: "is-success",
        outlined: false
      },
      {
        icon: "pen",
        tooltip: "Chỉnh sửa",
        type: "is-primary",
        outlined: false
      },
      {
        icon: "trash-alt",
        tooltip: "Xóa",
        type: "is-danger",
        outlined: false
      }
    ],
    testFeatureHandlers: []
  }),
  created: function() {
    this.testFeatureHandlers.push(
      null,
      this.$on_editButtonClicked,
      this.$on_deleteButtonClicked
    );
    this.$_loadAsyncData();
  },
  computed: {
    selectedTestId() {
      return this.selectedTest?.test_id;
    },
    isRowSelected() {
      return this.selectedTest !== null;
    },
    _table() {
      return this.$refs.table;
    }
  },
  watch: {
    tests: function() {
      this.selectedTest = null;
    },
    searchOptions() {
      this.$_loadAsyncData();
    }
  },
  methods: {
    ...mapActions("TEST", ["deleteTestById"]),

    $on_rowClicked(row) {
      this._table.closeDetailRow(row);
      if (this.selectedTestId === row.test_id) {
        this.selectedTest = null;
        return;
      }
      this._table.openDetailRow(row);
    },
    $on_sort(field, order) {
      this.sortOptions.sort_by = field;
      this.sortOptions.sort_order = order === "asc" ? 1 : -1;
      this.$_loadAsyncData();
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
      this.$api_searchTests({
        page: this.page,
        ...this.searchOptions,
        ...this.sortOptions
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
      this.tests.length = 0;
      this.tests.push(
        ...results.map((result, index) => {
          result.id = index + 1;
          return result;
        })
      );
    },
    $on_editButtonClicked() {
      this.$router.push({
        name: "EditTest",
        params: { test_id: this.selectedTest.test_id }
      });
    },
    $on_deleteButtonClicked() {
      const { test_id } = this.selectedTest;
      this.deleteTestById({ test_id }).then(result => {
        const { error } = result;
        if (error) {
          return;
        }
        this.$_loadAsyncData();
      });
    },
    $_resetTableState() {
      if (this.selectedTest) {
        this._table.closeDetailRow(this.selectedTest);
      }
      this.selectedTest = null;
    },
    $_removeQuestionFromTable(questionId) {
      this.tests = this.tests.filter(q => q.qa_id !== questionId);
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

.row--middle {
  vertical-align: middle;
}
</style>
