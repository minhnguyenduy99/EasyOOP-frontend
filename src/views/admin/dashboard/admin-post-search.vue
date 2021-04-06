<template>
  <div id="admin-post-search">
    <div id="admin-post-search-group">
      <b-input
        placeholder="Search name or tag"
        type="is-primary"
        icon="search"
        v-model="searchOptions.search"
        @keyup.enter.native="onSearchButtonClicked"
      />
      <b-select placeholder="Chủ đề" v-model="searchOptions.topic_id">
        <option v-for="topic in topics" :value="topic.topic_id" :key="topic.id">
          {{ topic.topic_title }}
        </option>
      </b-select>
      <b-select placeholder="Tình trạng" v-model="searchOptions.post_status">
        <option
          v-for="post_status in post_statuses"
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
import { POST_STATUSES } from "./consts";

export default {
  name: "AdminPostSearch",
  inject: ["findTopics"],
  data: () => ({
    searchOptions: {
      search: "",
      topic_id: null,
      post_status: null
    },
    post_statuses: [],
    topics: [
      {
        topic_id: null,
        topic_title: "Chọn chủ đề"
      }
    ]
  }),
  created: function() {
    this.post_statuses = Object.values(POST_STATUSES);
  },
  mounted: function() {
    this.$_getTopcis();
  },
  methods: {
    onSearchButtonClicked() {
      this.$emit("search", this.searchOptions);
    },
    $_getTopcis() {
      return this.findTopics({}).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.topics.push(...data);
      });
    }
  }
};
</script>

<style scoped lang="scss">
#admin-post-search-group {
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
