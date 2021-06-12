<template>
  <div id="dashboard-post-table">
    <b-table
      :data="creators"
      :paginated="!isTableEmpty"
      hoverable
      pagination-rounded
      :selected.sync="selectedCreator"
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
          image-src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1622949906/oop-learning-helper/empty_user_f0dwfl.png"
          text="Chưa có người viết bài nào"
        />
      </template>
      <template v-if="!isTableEmpty" #footer>
        <div>
          <span class="has-text-grey">Số lượng kết quả: </span>
          <span class="has-text-weight-bold">{{ totalCount }}</span>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "CreatorTable",
  components: {
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
    selectedCreator: null,
    loading: false,
    selected: {}
  }),
  mounted: function() {
    this.$_loadAsyncData();
  },
  computed: {
    selectedId() {
      return this.selectedCreator?.creator_id;
    },
    isRowSelected() {
      return this.selectedCreator !== null;
    },
    isTableEmpty() {
      return this.creators.length === 0;
    }
  },
  watch: {
    selectedCreator(val) {
      this.$emit("selected", val);
    },
    creators: function() {
      this.selectedCreator = null;
    },
    searchOptions(val) {
      this.$_loadAsyncData();
    }
  },
  methods: {
    $on_rowClicked(row) {
      if (row.creator_id === this.selectedId) {
        this.selectedCreator = null;
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
