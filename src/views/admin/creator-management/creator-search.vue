<template>
  <div id="admin-creators-search" class="is-flex">
    <b-input
      class="is-flex-grow-1"
      id="search-input"
      placeholder="Tên tác giả, ID của tác giả, User ID"
      type="is-primary"
      icon="search"
      v-model="searchOptions.search"
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
  name: "CreatorSearch",
  data: () => ({
    searchOptions: {
      search: ""
    }
  }),
  methods: {
    $on_searchButtonClicked() {
      this.$emit("search", this.searchOptions);
    }
  }
};
</script>
