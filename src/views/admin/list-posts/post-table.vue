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
      :row-class="(row, index) => 'is-clickable row--middle'"
      @page-change="onPageChanged"
      backend-sorting
      @sort="onSort"
      @click="onRowClicked"
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
        <router-link :to="$_getPostDetailView(row.post_id)">
          {{ row.post_title }}
        </router-link>
      </b-table-column>

      <b-table-column label="Chủ đề" width="200" v-slot="{ row }">
        {{ row.topic_title }}
      </b-table-column>

      <b-table-column label="Nhãn dán" width="200">
        <template v-slot="{ row }">
          <b-taglist>
            <b-tag
              class="is-tag"
              v-for="tag in row.tags"
              :key="tag.id"
              type="is-primary-light"
              size="is-small"
              >{{ tag.tag_value }}</b-tag
            >
          </b-taglist>
        </template>
      </b-table-column>

      <b-table-column
        field="created_date"
        label="Ngày tạo"
        width="100"
        v-slot="{ row }"
        sortable
      >
        {{ row.created_date.toLocaleDateString("en-GB") }}
      </b-table-column>

      <b-table-column
        field="post_status"
        label="Tình trạng"
        width="100"
        sortable
      >
        <template v-slot="{ row }">
          <div class="is-flex is-flex-direction-column is-align-items-center">
            <b-icon
              :icon="postStatuses[row.post_status].icon"
              :type="postStatuses[row.post_status].type"
              size="is-small"
            />
            <span class="is-size-7 has-text-weight-bold mt-2">{{
              postStatuses[row.post_status].title
            }}</span>
          </div>
        </template>
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
      <template #empty>
        <empty-state
          image-src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1618931250/oop-learning-helper/post_empty_state_xcrbog.png"
          text="Không có bài viết nào"
        />
      </template>
      <template #footer>
        <div>
          <span class="has-text-grey">Số lượng kết quả: </span>
          <span class="has-text-weight-bold">{{ totalCount }}</span>
        </div>
      </template>
    </b-table>
    <b-modal v-model="showModal" scroll="keep">
      <div class="card is-page-responsive py-6">
        <post-preview :useUrl="true" :contentUrl="fileContentUrl" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { ToastNotifier } from "../../../utils";
import { POST_STATUSES } from "./consts";

export default {
  name: "PostTable",
  components: {
    "post-preview": async () => (await import("@/components")).PostPreview,
    "empty-state": () => import("@/components/empty-state.vue")
  },
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
    postStatusIcons: {},
    postFeatures: [
      {
        icon: "eye",
        tooltip: "Xem",
        type: "is-primary",
        outlined: true
      },
      {
        icon: "pen",
        tooltip: "Chỉnh sửa",
        type: "is-primary",
        outlined: true
      },
      {
        icon: "trash-alt",
        tooltip: "Xóa bài viết",
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
    loading: false,
    postStatuses: {}
  }),
  created: function() {
    this.postFeatureHandler.push(
      this.onViewButtonClicked,
      this.onEditPostButtonClicked,
      this.onDeleteButtonClicked
    );
    Object.values(POST_STATUSES).forEach(status => {
      this.postStatuses[status.status.toString()] = {
        title: status.title,
        icon: status.icon,
        type: status.type
      };
    });
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
    },
    fileContentUrl() {
      return this.selectedPost?.content_file_url ?? null;
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
      this.sorter.sort_order = order;
      this.$_loadAsyncData();
    },
    async $_loadAsyncData() {
      this.loading = true;
      let searchOptions = {
        ...this.filter,
        post_status: "0",
        ...this.sorter
      };
      this.findPosts({
        page: this.page,
        searchOptions: searchOptions
      }).then(result => {
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
      const postId = this.selectedPost?.post_id;
      if (!postId) {
        return;
      }
      this.$buefy.dialog.confirm({
        title: "Xóa bài viết",
        message: "Bạn chắc chắc muốn xóa bài viết ?",
        confirmText: "Đồng ý",
        cancelText: "Hủy bỏ",
        type: "is-danger",
        onConfirm: () => {
          setTimeout(
            function() {
              this.loading = true;
              this.deletePost(postId).then(result => {
                const { error } = result;
                this.loading = false;
                if (error) {
                  ToastNotifier.error(
                    this.$buefy.toast,
                    "Xóa bài viết thất bại"
                  );
                  return;
                }
                ToastNotifier.success(
                  this.$buefy.toast,
                  "Xóa bài viết thành công"
                );
                this.$_loadAsyncData();
              });
            }.bind(this),
            500
          );
        }
      });
    },
    $_removePostFromTable(postId) {
      this.posts = this.posts.filter(post => post.post_id !== postId);
      this.totalCount--;
    },
    $_getPostDetailView(postId) {
      return {
        name: "AdminPostDetail",
        params: {
          post_id: postId
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
