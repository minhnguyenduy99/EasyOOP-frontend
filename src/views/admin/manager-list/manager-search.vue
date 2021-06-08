<template>
  <div id="manager-search" class="is-flex">
    <b-input
      class="is-flex-grow-1"
      id="search-input"
      placeholder="Tên quản lí, ID của quản lí, ID người dùng"
      type="is-primary"
      icon="search"
      v-model="searchOptions.alias"
      @keyup.enter.native="$on_searchButtonClicked"
    />
    <div class="ml-3 is-flex-grow-0">
      <b-button type="is-primary is-dark" @click="$on_searchButtonClicked"
        >Tìm kiếm</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ManagerSearch",
  data: () => ({
    searchOptions: {
      alias: ""
    }
  }),
  methods: {
    $on_searchButtonClicked() {
      this.$emit("search", this.searchOptions);
    }
  }
};
</script>
