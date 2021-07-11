<template>
  <div>
    <b-field grouped group-multiline>
      <b-input
        class="is-flex-grow-1"
        placeholder="Nhập tên bài viết"
        type="is-primary"
        icon="search"
        v-model="searchOptions.search"
        @keyup.enter.native="$on_applySearch"
      />
      <b-select v-model="searchOptions.status" class="is-fullwidth">
        <option
          v-for="status in VERIFICATION_STATUSES"
          :value="status.value"
          :key="status.id"
        >
          {{ status.text }}
        </option>
      </b-select>
    </b-field>
    <b-field grouped group-multiline>
      <p class="control">
        <b-button type="is-primary" @click="$on_applySearch">Tìm kiếm</b-button>
      </p>
      <p class="control">
        <b-button
          class="is-icon-button"
          type="is-primary"
          icon-right="sync-alt"
          size="is-medium"
          rounded
          inverted
          @click="$on_reloadButtonClicked"
        />
      </p>
    </b-field>
  </div>
</template>

<script>
export default {
  name: "PostSearch",
  components: {
    "modal-form": () => import("@/components/modal-form")
  },
  data: () => ({
    DEFAULT_SEARCH_OPTIONS: {
      search: null,
      sort_by: "last_edited_date",
      sort_order: "desc",
      status: null
    },
    VERIFICATION_STATUSES: [
      {
        value: 2,
        text: "Chờ duyệt"
      },
      {
        value: 0,
        text: "Không được duyệt"
      },
      {
        value: 3,
        text: "Hủy duyệt"
      },
      {
        value: null,
        text: "Tất cả"
      }
    ],
    searchOptions: {
      search: null,
      sort_by: "last_edited_date",
      sort_order: "desc",
      status: null
    }
  }),
  computed: {
    selectedSortOrderOption() {
      return this.sortOrderOptions[this.searchOptions.sort_by];
    }
  },
  methods: {
    $on_applySearch() {
      this.$emit("search", { ...this.searchOptions });
    },
    $on_reloadButtonClicked() {
      this.searchOptions = {};
      this.$nextTick(() => {
        this.$emit("search", { ...this.searchOptions });
      });
    }
  }
};
</script>
