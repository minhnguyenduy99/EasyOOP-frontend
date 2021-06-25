<template>
  <div id="qanda-search" class="input-group ha-vertical-layout-7">
    <b-input
      class="is-flex-grow-1 is-fullwidth"
      placeholder="Tìm kiếm câu hỏi"
      type="is-primary"
      size="is-medium"
      icon="search"
      v-model="searchOptions.value"
      @keyup.enter.native="$on_search"
    />
    <b-checkbox
      class="is-fullwidth"
      size="is-medium"
      v-model="searchOptions.hasTag"
      false-value="0"
      true-value="1"
      :indeterminate="indeterminate"
      >Đã có tag</b-checkbox
    >
    <div class="is-flex">
      <b-button
        class="is-flex-grow-1"
        type="is-primary"
        @click="$on_search"
        size="is-medium"
        >Tìm kiếm</b-button
      >
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

<style scoped lang="scss"></style>
