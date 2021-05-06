<template>
  <div id="dashboard-post-table">
    <b-table
      :data="creators"
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
      <b-table-column label="ID">
        <template v-slot="{ row }">
          <span>
            <a href="#">{{ row.creator_id }}</a>
          </span>
        </template>
      </b-table-column>

      <b-table-column
        label="Tên người viết bài"
        width="300"
        v-slot="{ row }"
        cell-class="is-align-items-center"
      >
        {{ row.alias }}
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
      <template #empty>
        <empty-state
          image-src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1618931250/oop-learning-helper/post_empty_state_xcrbog.png"
          text="Chưa có người viết bài nào"
        />
      </template>
      <template v-if="!isTableEmpty" #footer>
        <div>
          <span class="has-text-grey">Total results: </span>
          <span class="has-text-weight-bold">{{ totalCount }}</span>
        </div>
      </template>
    </b-table>
    <b-modal v-model="showModal" scroll="keep">
      <div class="card is-page-responsive py-6">
        <post-preview :post="selected" :trigger="false" />
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "PostTable",
  components: {
    "post-preview": async () => (await import("@/components")).PostPreview,
    "empty-state": () => import("@/components/empty-state.vue")
  },
  props: {
    type: Number,
    searchOptions: {
      type: Object,
      default: () => {}
    }
  },
  inject: ["$api_findCreators"],
  data: () => ({
    ACTIONS: [],
    creators: [],
    itemsPerPage: 6,
    totalCount: 0,
    page: 1,
    sorter: {
      sort_by: "time",
      order: -1
    },
    actionHandler: [],
    showModal: false,
    selectedVerification: null,
    loading: false,
    selected: {}
  }),
  mounted: function() {
    this.$_loadAsyncData();
  },
  computed: {
    selectedId() {
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
      return this.creators.length === 0;
    }
  },
  watch: {
    selectedVerification(val) {
      this.$emit("selected", val);
    },
    creators: function() {
      this.selectedVerification = null;
    },
    searchOptions(val) {
      this.$_loadAsyncData(val);
    }
  },
  methods: {
    $on_rowClicked(row) {
      if (row.verification_id === this.selectedId) {
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
      this.$api_findCreators(search).then(result => {
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
      this.creators.length = 0;
      this.creators.push(
        ...results.map((result, index) => {
          result.id = index + 1;
          return result;
        })
      );
    },
    $_isActionsGroupShown(row) {
      return (
        this.selectedId === row.verification_id &&
        this.filteredActions.length > 0
      );
    },
    $on_viewButtonClicked() {
      this.showModal = true;
      this.getPostById(this.selectedVerification.post_id).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.selected = data;
      });
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
