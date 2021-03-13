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
      <b-select placeholder="Topics" v-model="searchOptions.topic_id">
        <option v-for="topic in topics" :value="topic.topic_id" :key="topic.id">
          {{ topic.topic_title }}
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
export default {
  name: "AdminPostSearch",
  inject: ["findTopics"],
  data: () => ({
    searchOptions: {
      search: "",
      topic_id: -1
    },
    topics: [
      {
        topic_id: -1,
        topic_title: "Select topic"
      }
    ]
  }),
  mounted: function() {
    this.$_getTopcis();
  },
  methods: {
    onSearchButtonClicked() {
      this.$emit("search", this.searchOptions);
    },
    $_getTopcis() {
      return this.findTopics().then(result => {
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
    &:first-child {
      margin-bottom: 0.5rem;
    }
  }

  @include tablet {
    display: flex;

    > .control {
      &:first-child {
        margin-bottom: 0;
        margin-right: 1rem;
      }
    }
  }
}
</style>
