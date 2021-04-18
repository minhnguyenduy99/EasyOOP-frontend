<template>
  <div id="pending-post-search">
    <div id="pending-post-search-group">
      <b-input
        placeholder="Nhập tên bài viết"
        type="is-primary"
        icon="search"
        v-model="searchOptions.search"
        @keyup.enter.native="onSearchButtonClicked"
      />
      <b-select placeholder="Loại bài viết" v-model="searchOptions.post_type">
        <option v-for="type in postTypes" :value="type.value" :key="type.id">
          {{ type.text }}
        </option>
      </b-select>
      <b-select placeholder="Tình trạng" v-model="searchOptions.post_status">
        <option
          v-for="post_status in postStatuses"
          :value="post_status.status"
          :key="post_status.id"
        >
          {{ post_status.title }}
        </option>
      </b-select>
    </div>
    <div class="mt-3">
      <b-button type="is-primary is-dark" @click="onSearchButtonClicked"
        >Tìm kiếm</b-button
      >
    </div>
  </div>
</template>

<script>
import { POST_STATUSES, POST_TYPES } from "./consts";

export default {
  name: "PostSearch",
  data: () => ({
    searchOptions: {
      search: "",
      post_status: -1,
      post_type: null
    },
    postStatuses: [],
    postTypes: []
  }),
  created: function() {
    this.postStatuses = POST_STATUSES;
    this.postTypes = POST_TYPES;
  },
  methods: {
    onSearchButtonClicked() {
      this.$emit("search", this.searchOptions);
    }
  }
};
</script>

<style scoped lang="scss">
#pending-post-search-group {
  > .control {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }

  @include tablet {
    display: flex;

    > .control {
      width: fit-content;
      &:not(:last-child) {
        margin-bottom: 0;
        margin-right: 1rem;
      }
    }
  }
}
</style>
