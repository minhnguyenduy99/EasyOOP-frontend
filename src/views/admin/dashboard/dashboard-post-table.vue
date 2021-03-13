<template>
  <div id="dashboard-post-table">
    <b-table
      :data="posts"
      paginated
      hoverable
      pagination-rounded
      :selected.sync="selectedPost"
      :is-row-selectable="() => true"
      :loading="loading"
      pagination-size="is-small"
      :per-page="itemsPerPage"
      :total="totalCount"
      backend-pagination
      :row-class="(row, index) => 'is-clickable'"
      @page-change="onPageChanged"
      backend-sorting
      @sort="onSort"
      @click="onRowClicked"
    >
      <b-table-column label="ID" width="40" numeric>
        <template v-slot="{ row }">
          <strong>{{ row.id }}</strong>
        </template>
      </b-table-column>

      <b-table-column label="Post title" width="300" v-slot="{ row }">
        {{ row.post_title }}
      </b-table-column>

      <b-table-column label="Topic" width="200">
        <template v-slot="{ row }">
          <b-tag type="is-primary-light" size="is-small">{{
            row.topic_title
          }}</b-tag>
        </template>
      </b-table-column>

      <b-table-column
        field="time"
        label="Last edited"
        width="100"
        v-slot="{ row }"
        sortable
      >
        {{ row.created_date.toLocaleDateString("en-GB") }}
      </b-table-column>

      <b-table-column
        :visible="isRowSelected"
        label=""
        width="auto"
        v-slot="{ row }"
      >
        <template v-if="selectedPostId === row.id">
          <section
            class="tooltip-section"
            style="margin-top: -4px; margin-bottom: -6px"
          >
            <b-tooltip
              v-for="(feature, index) in postFeatures"
              :key="feature.id"
              :label="feature.tooltip"
              :type="feature.type"
            >
              <b-button
                size="is-small"
                :icon-left="feature.icon"
                :type="feature.type"
                :outlined="feature.outlined"
                @click.stop="postFeatureHandler[index]"
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
    <b-modal v-model="showModal" scroll="keep">
      <div class="card is-page-responsive py-6">
        <ha-post-view :post="selectedPost" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { ToastNotifier } from "../../../utils";

export default {
  name: "DashboardPostTable",
  props: {
    filter: {
      type: Object,
      default: () => null
    },
    search: {
      type: Boolean,
      default: () => false
    }
  },
  inject: ["findPosts", "deletePost"],
  model: {
    prop: "search",
    event: "table-search"
  },
  data: () => ({
    itemsPerPage: 6,
    totalCount: 0,
    posts: [],
    postFeatures: [
      {
        icon: "eye",
        tooltip: "Preview",
        type: "is-primary",
        outlined: true
      },
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
    sorter: {
      sort_by: "time",
      order: -1
    },
    page: 1,
    postFeatureHandler: [],
    showModal: false,
    selectedPost: null,
    loading: false
  }),
  created: function() {
    this.postFeatureHandler.push(
      this.onViewButtonClicked,
      this.onEditPostButtonClicked,
      this.onDeleteButtonClicked
    );
    this.$_loadAsyncData();
  },
  computed: {
    selectedPostId() {
      return this.selectedPost?.id;
    },
    isRowSelected() {
      return this.selectedPost !== null;
    },
    _search: {
      get() {
        return this.search;
      },
      set(val) {
        this.$emit("table-search", val);
      }
    }
  },
  watch: {
    search: function(newVal, oldVal) {
      if (newVal) {
        this.$_loadAsyncData();
        return;
      }
    },
    posts: function() {
      this.selectedPost = null;
    }
  },
  methods: {
    onRowClicked(row) {
      if (row.id === this.selectedPostId) {
        this.selectedPost = null;
      }
    },
    onPageChanged(page) {
      this.page = page;
      this.$_loadAsyncData();
    },
    onSort(field, order) {
      this.sorter["sort_by"] = field;
      this.sorter.order = order === "asc" ? 1 : -1;
      this.$_loadAsyncData();
    },
    async $_loadAsyncData() {
      this.loading = true;
      let searchOptions = {
        ...this.filter,
        ...this.sorter
      };
      this.findPosts(this.page, searchOptions).then(result => {
        const { error, data } = result;
        this.loading = false;
        this._search = false;
        if (error) {
          return;
        }
        this.$_updateData(data);
      });
    },
    $_updateData(data) {
      const { total_count, results } = data;
      this.totalCount = total_count;
      this.posts.length = 0;
      this.posts.push(
        ...results.map((result, index) => {
          result.id = index + 1;
          result.created_date = new Date(result.created_date);
          return result;
        })
      );
    },
    onViewButtonClicked() {
      this.showModal = true;
    },
    onEditPostButtonClicked() {
      this.$router.push({
        name: "EditPost",
        params: { post_id: this.selectedPost.post_id }
      });
    },
    onDeleteButtonClicked() {
      this.loading = true;
      const postId = this.selectedPost?.post_id;
      if (!postId) {
        return;
      }
      this.deletePost(postId).then(result => {
        const { error } = result;
        if (error) {
          ToastNotifier.error(this.$buefy.toast, "Xóa bài viết thất bại");
          return;
        }
        ToastNotifier.success(this.$buefy.toast, "Xóa bài viết thành công");
      });
    },
    $_removePostFromTable(postId) {
      this.posts = this.posts.filter(post => post.post_id !== postId);
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
</style>
