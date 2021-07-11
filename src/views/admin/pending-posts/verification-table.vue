<template>
  <div class="verification-table">
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
      :row-class="(row, index) => 'is-clickable row--middle'"
      backend-sorting
      @page-change="$on_pageChanged"
      @sort="$on_sort"
      @click="$on_rowClicked"
    >
      <b-table-column label="STT" width="40" numeric centered>
        <template v-slot="{ row }">
          <strong>{{ row.id }}</strong>
        </template>
      </b-table-column>

      <b-table-column
        label="Tên bài viết"
        width="250"
        v-slot="{ row }"
        cell-class="is-align-items-center"
      >
        {{ row.post_title }}
      </b-table-column>

      <b-table-column
        label="Tình trạng"
        width="100"
        v-slot="{ row: { status } }"
      >
        <template>
          <b-tag
            size="is-small"
            :type="VERIFICATION_STATUS_STYLES[status].type"
            class="has-text-weight-bold"
          >
            {{ VERIFICATION_STATUS_STYLES[status].text }}
          </b-tag>
        </template>
      </b-table-column>

      <b-table-column
        field="last_edited_date"
        label="Ngày cập nhật"
        width="130"
        numeric
        v-slot="{ row }"
        sortable
      >
        {{ new Date(row.last_edited_date).toLocaleDateString("en-GB") }}
      </b-table-column>

      <template #empty>
        <empty-state
          image-src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1618931250/oop-learning-helper/post_empty_state_xcrbog.png"
          text="Bạn không có bài duyệt nào"
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
import { mapActions } from "vuex";
import {
  VerificationStyleMixin,
  BaseVerificationTableMixin
} from "../components/verification/mixins";

export default {
  name: "VerificationTable",
  components: {
    "empty-state": () => import("@/components/empty-state.vue")
  },
  mixins: [BaseVerificationTableMixin, VerificationStyleMixin],
  props: {
    searchOptions: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    loading: false
  }),
  mounted: function() {
    this.$_loadAsyncData();
  },
  watch: {
    searchOptions(val) {
      this.page = 1;
      this.$_loadAsyncData(val);
    }
  },
  methods: {
    ...mapActions("POST", ["creator_findVerifications"]),

    $on_rowClicked(row) {
      if (row.verification_id === this.selectedVerificationId) {
        this.selectedVerification = null;
      }
    },
    $on_pageChanged(page) {
      this.page = page;
      this.$emit("pageChanged", page);
      this.$_loadAsyncData({ sort: true });
    },
    $on_sort(field, order) {
      this.sorter["sort_by"] = field;
      this.sorter.sort_order = order;
      this.$_loadAsyncData({ sort: true });
    },
    $_loadAsyncData(options = {}) {
      this.loading = true;
      const { sort = false } = options ?? {};
      let search = {
        ...this.searchOptions,
        ...(sort && this.sorter),
        page: this.page
      };
      this.creator_findVerifications(search).then(result => {
        this.loading = false;
        const { error, data } = result;
        if (error) {
          return;
        }
        const { results, total_count } = data;
        this.$m_updateTableData(total_count, results);
      });
    }
  }
};
</script>
