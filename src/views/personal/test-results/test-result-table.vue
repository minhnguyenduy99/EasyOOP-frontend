<template>
  <div id="test-result-table">
    <b-table
      :data="results"
      paginated
      pagination-position="top"
      hoverable
      pagination-rounded
      :loading="loading"
      pagination-size="is-small"
      :per-page="itemsPerPage"
      :total="totalCount"
      backend-pagination
      :row-class="(row, index) => 'is-clickable row--middle'"
      @page-change="$on_pageChanged"
      backend-sorting
      @sort="$on_sort"
      ref="table"
    >
      <b-table-column label="ID" width="20" header-class="has-text-left">
        <template v-slot="{ row }">
          <b-dropdown>
            <template #trigger="{ active }">
              <b-button
                outlined
                class="has-text-weight-bold"
                size="is-small"
                icon-pack="fas"
                type="is-primary"
                :icon-right="active ? 'chevron-up' : 'chevron-down'"
              >
                {{ row.result_id }}
              </b-button>
            </template>
            <b-dropdown-item
              v-for="menu in actionMenus"
              :key="menu.id"
              paddingless
              class="p-3"
            >
              <router-link
                :to="menu.to(row)"
                class="media is-align-items-center"
              >
                <b-icon class="media-left" :icon="menu.icon"></b-icon>
                <div class="media-content">
                  <h3>
                    {{ menu.text }}
                  </h3>
                </div>
              </router-link>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table-column>

      <b-table-column
        label="Tên bài test"
        width="300"
        v-slot="{ row }"
        cell-class="row--middle"
      >
        <span class="has-text-weight-bold">
          {{ row.title }}
        </span>
      </b-table-column>

      <b-table-column
        label="Số lượng"
        numeric
        width="150px"
        field="total_count"
      >
        <template
          v-slot="{
            row: { total_sentence_count: tsc, correct_answer_count: cac }
          }"
        >
          <span class="has-text-weight-bold has-text-primary-dark">
            {{ cac }} / {{ tsc }}
          </span>
        </template>
      </b-table-column>

      <b-table-column
        label="Điểm số"
        sortable
        centered
        field="obtained_score"
        width="120px"
        cell-class="row--middle"
      >
        <template v-slot="{ row: { obtained_score: os, total_score: ts } }">
          <b-tag
            class="has-text-weight-bold"
            type="is-success"
            size="is-medium"
          >
            {{ os }} / {{ ts }}
          </b-tag>
        </template>
      </b-table-column>

      <b-table-column label="Ngày làm" sortable centered field="created_date">
        <template v-slot="{ row }">
          <span>
            {{ new Date(row.created_date).toLocaleDateString("en-GB") }}
          </span>
        </template>
      </b-table-column>

      <template #empty>
        <empty-state
          image-src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1622949906/oop-learning-helper/empty_test_rbkyrn.png"
          text="Bạn chưa làm bài test nào"
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
export default {
  name: "PersonalTestResultTable",
  components: {
    "empty-state": () => import("@/components/empty-state.vue")
  },
  data: () => ({
    actionMenus: [
      {
        icon: "info-circle",
        text: "Xem kết quả",
        to: result => ({
          name: "TestResultInfoPage",
          params: {
            result_id: result.result_id
          }
        })
      },
      {
        icon: "pen-alt",
        text: "Làm lại",
        to: result => ({
          name: "TestDetailPage",
          params: {
            test_id: result.test_id
          }
        })
      }
    ],
    itemsPerPage: 10,
    totalCount: 0,
    results: [],
    selectedData: null,
    page: 1,
    featureHandler: [],
    showModal: false,
    loading: false,
    openedDetailedRows: [],
    sortOptions: {
      sort_by: "created_date",
      sort_order: -1
    }
  }),
  created: function() {
    this.$_loadAsyncData();
  },
  computed: {
    selectedDataId() {
      return this.selectedData?.result_id;
    },
    isRowSelected() {
      return this.selectedData !== null;
    },
    _table() {
      return this.$refs.table;
    }
  },
  watch: {
    results: function() {
      this.selectedData = null;
    }
  },
  methods: {
    ...mapActions("TEST", ["viewer_searchTestResults"]),

    $on_rowClicked(row) {
      this._table.closeDetailRow(row);
      if (this.selectedDataId === row.result_id) {
        this.selectedData = null;
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
    async $_loadAsyncData() {
      this.loading = true;
      const options = {
        page: this.page,
        ...this.sortOptions
      };
      this.viewer_searchTestResults(options).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$_updateData(data);
        this.loading = false;
      });
    },
    $_updateData(data) {
      const { total_count, results } = data;
      this.totalCount = total_count;
      this.results.length = 0;
      this.results.push(
        ...results.map((result, index) => {
          result.id = index + 1;
          return result;
        })
      );
    },
    $_getTestLink(testId) {
      return {
        name: "TestDetailPage",
        params: {
          test_id: testId
        }
      };
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
