<template>
  <div id="qanda-search">
    <b-input
      class="is-flex-grow-1"
      placeholder="Tìm kiếm câu hỏi"
      type="is-primary"
      icon="search"
      v-model="searchOptions.value"
      @keyup.enter.native="$on_search"
    />
    <b-checkbox
      v-model="searchOptions.hasTag"
      false-value="0"
      true-value="1"
      :indeterminate="indeterminate"
      >Đã có tag</b-checkbox
    >
    <b-button type="is-primary" @click="$on_search">Tìm kiếm</b-button>
    <b-button
      class="ml-3 is-icon-button"
      type="is-primary"
      icon-right="sync-alt"
      size="is-medium"
      rounded
      inverted
      @click="$on_resetSearch"
    />
  </div>
</template>

<script>
export default {
  name: "QandASearch",
  data: () => ({
    searchOptions: {
      value: "",
      hasTag: null
    },
    indeterminate: true
  }),
  methods: {
    $on_search() {
      this.$emit("search", this.searchOptions);
    },
    $on_resetSearch() {
      this.indeterminate = true;
      this.searchOptions = {
        value: "",
        hasTag: null
      };
      this.$on_search();
    }
  }
};
</script>

<style scoped lang="scss">
#qanda-search {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  > *:not(:last-child) {
    margin-right: 1rem;
  }
}
</style>
