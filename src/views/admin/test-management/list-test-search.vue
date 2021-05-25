<template>
  <div id="mock-test-search">
    <div class="input-group--horizontal">
      <b-input
        class="is-flex-grow-1"
        placeholder="Tìm kiếm bài test"
        type="is-primary"
        icon="search"
        v-model="searchOptions.title"
        @keyup.enter.native="$on_search"
      />
      <b-select
        placeholder="Tình trạng"
        v-model="searchOptions.verifying_status"
      >
        <option
          v-for="status in TEST_STATUSES"
          :key="status.id"
          :value="status.code"
        >
          {{ status.text }}
        </option>
      </b-select>
      <b-select placeholder="Loại bài test" v-model="searchOptions.type">
        <option v-for="type in TEST_TYPES" :key="type.id" :value="type.code">
          {{ type.text }}
        </option>
      </b-select>
    </div>
    <div class="is-flex is-align-items-center buttons">
      <b-button type="is-primary" @click="$on_search">Tìm kiếm</b-button>
      <b-button
        class="is-icon-button"
        type="is-primary"
        icon-right="sync-alt"
        size="is-medium"
        rounded
        inverted
        @click="$on_resetSearch"
      />
    </div>
  </div>
</template>

<script>
const DEFAULT_SEARCH_OPTIONS = {
  title: null,
  verifying_status: null,
  type: null
};

export default {
  name: "ListTestSearch",
  data: () => ({
    TEST_STATUSES: [
      {
        code: 1,
        text: "Đã duyệt"
      },
      {
        code: 2,
        text: "Không được duyệt"
      },
      {
        code: 3,
        text: "Chờ duyệt"
      },
      {
        code: null,
        text: "Chọn tất cả"
      }
    ],
    TEST_TYPES: [
      {
        code: 1,
        text: "Giới hạn thời gian"
      },
      {
        code: 2,
        text: "Không giới hạn thời gian"
      },
      {
        code: null,
        text: "Chọn tất cả"
      }
    ],
    searchOptions: { ...DEFAULT_SEARCH_OPTIONS }
  }),
  methods: {
    $on_search() {
      this.$emit("search", this.searchOptions);
    },
    $on_resetSearch() {
      this.searchOptions = { ...DEFAULT_SEARCH_OPTIONS };
      this.$on_search();
    }
  }
};
</script>

<style scoped lang="scss">
#mock-test-search {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  > *:not(:last-child) {
    margin-right: 1rem;
  }
}

.input-group {
  &--horizontal {
    display: flex;
    > *:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>
