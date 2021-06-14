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

      <b-table-column
        label="Chủ đề"
        field="topic_id"
        v-slot="{ row }"
        sortable
        width="150px"
      >
        <span class="has-text-primary-dark">{{ row.topic.topic_title }}</span>
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
            v-if="row.verifying_status === 1"
            class="tooltip-section"
            style="margin-top: -4px; margin-bottom: -6px"
          >
            <b-tooltip
              v-for="(feature, index) in availableTestFeatureGroups"
              :key="feature.id"
              :label="feature.tooltip"
              :type="feature.type"
            >
              <b-button
                v-if="feature.isLink"
                class="is-icon-button"
                size="is-small"
                :icon-left="feature.icon"
                tag="router-link"
                :type="feature.type"
                :outlined="feature.outlined"
                :to="feature.to(selectedTest)"
              />
              <b-button
                v-else
                class="is-icon-button"
                size="is-small"
                :icon-left="feature.icon"
                :type="feature.type"
                :outlined="feature.outlined"
                @click.stop="testFeatureHandlers['1'][index]"
              />
            </b-tooltip>
          </section>
          <section
            v-else-if="row.verifying_status === 2"
            class="tooltip-section"
            style="margin-top: -4px; margin-bottom: -6px"
          >
            <b-tooltip
              v-for="(feature, index) in unavailableTestFeatureGroups"
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
                @click.stop="testFeatureHandlers['2'][index]"
              />
            </b-tooltip>
          </section>
        </template>
      </b-table-column>
      <template #empty>
        <empty-state
          image-src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1622949906/oop-learning-helper/empty_test_rbkyrn.png"
          text="Bạn không có bài test nào"
        />
      </template>

      <template #footer>
        <div>
          <span class="has-text-grey">Số lượng kết quả: </span>
          <span class="has-text-weight-bold">{{ totalCount }}</span>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ToastNotifier } from "@/utils";
export default {
  name: "ListTestTable",
  components: {
    "empty-state": () => import("@/components/empty-state.vue")
  },
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
    TEST_STATUSES: {
      1: {
        icon: "check",
        type: "is-success",
        title: "Có sẵn"
      },
      2: {
        type: "is-danger",
        title: "Đã xóa"
      }
    },
    itemsPerPage: 10,
    totalCount: 0,
    tests: [],
    selectedTest: null,
    page: 1,
    featureHandler: [],
    showModal: false,
    loading: false,
    openedDetailedRows: [],
    sortOptions: {
      sort_by: null,
      sort_order: null
    },
    availableTestFeatureGroups: [
      {
        icon: "spell-check",
        tooltip: "Làm thử",
        type: "is-success",
        outlined: false,
        isLink: true,
        to: test => ({
          name: "TestDetailPage",
          params: { test_id: test.test_id }
        })
      },
      {
        icon: "pen",
        tooltip: "Chỉnh sửa",
        type: "is-primary",
        outlined: false,
        isLink: true,
        to: test => ({
          name: "EditTest",
          params: { test_id: test.test_id }
        })
      },
      {
        icon: "trash-alt",
        tooltip: "Xóa",
        type: "is-danger",
        outlined: false,
        isLink: false
      }
    ],
    unavailableTestFeatureGroups: [
      {
        icon: "window-restore",
        tooltip: "Phục hồi",
        type: "is-info",
        outlined: false,
        status: 0,
        isLink: false
      },
      {
        icon: "trash",
        tooltip: "Xóa vĩnh viễn",
        type: "is-danger",
        outlined: false,
        status: 0,
        isLink: false
      }
    ],
    testFeatureHandlers: { 1: [], 2: [] }
  }),
  mounted: function() {
    // features for available test
    this.testFeatureHandlers[1].push(null, null, this.$on_deleteButtonClicked);
    // features for unavailable test)
    this.testFeatureHandlers[2].push(
      this.$on_restoreTest,
      this.$on_deleteTestPermanently
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
    ...mapActions("TEST", ["deleteTestById", "restoreTest"]),

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
      console.log(this.searchOptions);
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
        ToastNotifier.success(this.$buefy.toast, "Xóa bài test thành công");
        this.$_loadAsyncData();
      });
    },
    $on_navigateTestPage() {
      const testId = this.selectedTest.test_id;
      this.$router.push({
        name: "TestDetailPage",
        params: { test_id: testId }
      });
    },
    $on_restoreTest() {
      const testId = this.selectedTest.test_id;
      this.restoreTest({ test_id: testId }).then(result => {
        const { error } = result;
        if (error) {
          return;
        }
        ToastNotifier.success(this.$buefy.toast, "Phục hồi thành công");
        this.$_loadAsyncData();
      });
    },
    $on_deleteTestPermanently() {
      this.$buefy.dialog.confirm({
        title: "Xóa bài test",
        message:
          "Bạn chắc chắc muốn xóa bài viết ?</br><strong>Bài viết đã xóa sẽ không thể phục hồi</strong>",
        confirmText: "Đồng ý",
        cancelText: "Hủy bỏ",
        type: "is-danger",
        onConfirm: () => {
          const { test_id } = this.selectedTest;
          this.deleteTestById({ test_id, permanently: true }).then(result => {
            const { error } = result;
            if (error) {
              return;
            }
            ToastNotifier.success(this.$buefy.toast, "Xóa bài test thành công");
            this.$_loadAsyncData();
          });
        }
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
