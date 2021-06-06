<template>
  <div id="dashboard-post-table">
    <b-table
      :data="verifications"
      :paginated="!isTableEmpty"
      hoverable
      pagination-rounded
      :selected.sync="selectedVerification"
      :is-row-selectable="() => true"
      :loading="loading"
      pagination-size="is-small"
      :per-page="itemsPerPage"
      :total="totalCount"
      backend-pagination
      :row-class="(row, index) => 'is-clickable'"
      backend-sorting
      @page-change="$on_pageChanged"
      @sort="$on_sort"
      @click="$on_rowClicked"
    >
      <b-table-column label="ID" width="40" numeric centered>
        <template v-slot="{ row }">
          <strong>{{ row.id }}</strong>
        </template>
      </b-table-column>

      <b-table-column
        label="Tên bài viết"
        width="300"
        v-slot="{ row }"
        cell-class="is-align-items-center"
      >
        {{ row.post_title }}
      </b-table-column>

      <b-table-column label="Loại duyệt" width="200" v-slot="{ row }">
        <template>
          <b-tag size="is-small" type="is-primary-light">
            {{ VERIFICATION_TYPES[row.type].text }}
          </b-tag>
        </template>
      </b-table-column>

      <b-table-column
        field="created_date"
        label="Ngày tạo"
        width="100"
        v-slot="{ row }"
        sortable
      >
        {{ new Date(row.created_date).toLocaleDateString("en-GB") }}
      </b-table-column>

      <b-table-column
        :visible="isRowSelected && filteredActions.length > 0"
        label=""
        width="auto"
      >
        <template>
          <section
            class="tooltip-section"
            style="margin-top: -4px; margin-bottom: -6px"
          >
            <b-tooltip
              v-for="(action, index) in filteredActions"
              :key="action.id"
              :label="action.tooltip"
              :type="action.type"
            >
              <b-button
                size="is-small"
                :icon-left="action.icon"
                :type="action.type"
                :outlined="action.outlined"
                @click.stop="actionHandler[index]"
              />
            </b-tooltip>
          </section>
        </template>
      </b-table-column>
      <template #empty>
        <empty-state
          image-src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1618931250/oop-learning-helper/post_empty_state_xcrbog.png"
          text="Bạn không có bài duyệt nào"
        />
      </template>
      <template v-if="!isTableEmpty" #footer>
        <div>
          <span class="has-text-grey">Total results: </span>
          <span class="has-text-weight-bold">{{ totalCount }}</span>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { VERIFICATION_TYPES } from "./consts";

export default {
  name: "PostTable",
  components: {
    "empty-state": () => import("@/components/empty-state.vue")
  },
  props: {
    type: Number,
    searchOptions: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Boolean,
      default: () => false
    }
  },
  inject: [
    "manager_getPendingVerifications",
    "manager_findVerifications",
    "manager_verify",
    "manager_unverify",
    "previewSelectedPost"
  ],
  data: () => ({
    ACTIONS: [
      {
        icon: "eye",
        tooltip: "Xem trước",
        type: "is-primary",
        outlined: true,
        statuses: [1, 2]
      },
      {
        icon: "check",
        tooltip: "Duyệt",
        type: "is-success",
        outlined: false,
        statuses: [2]
      },
      {
        icon: "ban",
        tooltip: "Không duyệt",
        type: "is-danger",
        outlined: false,
        statuses: [2]
      }
    ],
    verifications: [],
    VERIFICATION_TYPES: [],
    itemsPerPage: 6,
    totalCount: 0,
    page: 1,
    sorter: {
      sort_by: "time",
      order: -1
    },
    actionHandler: [],
    selectedVerification: null,
    loading: false
  }),
  created: function() {
    this.actionHandler.push(
      this.$on_viewButtonClicked,
      this.$on_verifyButtonClicked,
      this.$on_unverifyButtonClicked
    );
    this.VERIFICATION_TYPES = VERIFICATION_TYPES;
  },
  mounted: function() {
    this.$_loadAsyncData();
  },
  computed: {
    selectedVerificationId() {
      return this.selectedVerification?.verification_id;
    },
    isRowSelected() {
      return this.selectedVerification !== null;
    },
    selectedApi() {
      if (this.type === 2) {
        return this.manager_getPendingVerifications;
      }
      return this.manager_findVerifications;
    },
    filteredActions() {
      return this.ACTIONS.filter(action => action.statuses.includes(this.type));
    },
    isTableEmpty() {
      return this.verifications.length === 0;
    }
  },
  watch: {
    active(val) {
      if (val) {
        return;
      }
      this.selectedVerification = null;
    },
    selectedVerification(val) {
      this.$emit("selected", val);
    },
    verifications: function() {
      this.selectedVerification = null;
    },
    searchOptions(val) {
      this.$_loadAsyncData(val);
    }
  },
  methods: {
    $on_rowClicked(row) {
      if (row.verification_id === this.selectedVerificationId) {
        this.selectedVerification = null;
      }
    },
    $on_pageChanged(page) {
      this.page = page;
      this.$_loadAsyncData();
    },
    $on_sort(field, order) {
      this.sorter["sort_by"] = field;
      this.sorter.sort_order = order;
      this.$_loadAsyncData();
    },
    $_loadAsyncData() {
      let search = {
        ...this.searchOptions,
        ...this.sorter,
        status: this.type,
        page: this.page
      };
      this.selectedApi(search).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$_updateData(data);
      });
    },
    $_updateData(data) {
      const { total_count, results } = data;
      this.totalCount = total_count;
      this.verifications.length = 0;
      this.verifications.push(
        ...results.map((result, index) => {
          result.id = index + 1;
          return result;
        })
      );
    },
    $_isActionsGroupShown(row) {
      return (
        this.selectedVerificationId === row.verification_id &&
        this.filteredActions.length > 0
      );
    },
    $on_viewButtonClicked() {
      this.previewSelectedPost();
    },
    $on_verifyButtonClicked() {
      this.$buefy.dialog.confirm({
        title: "Hủy duyệt bài viết",
        message: "Bạn chắc chắn muốn hủy duyệt bài viết ?",
        confirmText: "Đồng ý",
        cancelText: "Hủy bỏ",
        type: "is-danger",
        onConfirm: () => {
          this.manager_verify({
            verification_id: this.selectedVerificationId
          }).then(result => {
            const { error } = result;
            if (error) {
              return;
            }
            this.$_removeVerificationFromTable(this.selectedVerificationId);
          });
        }
      });
    },
    $on_unverifyButtonClicked() {
      this.manager_unverify({
        verification_id: this.selectedVerificationId
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$_removeVerificationFromTable(this.selectedVerificationId);
      });
    },
    $_removeVerificationFromTable(verificationId) {
      this.verifications = this.verifications.filter(
        ver => ver.verification_id !== verificationId
      );
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
  tr {
    th.checkbox-cell {
      background: $grey-lighter;
    }
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

.is-vertical-middle {
  vertical-align: middle;
}
</style>
