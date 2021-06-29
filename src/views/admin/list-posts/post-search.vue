<template>
  <div id="admin-post-search">
    <div id="admin-post-search-group">
      <b-input
        class="input--search"
        placeholder="Tìm kiếm bài viết theo tên hoặc nhãn dán"
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
    </div>
    <div class="mt-5 button-container">
      <b-button type="is-primary is-dark" @click="onSearchButtonClicked"
        >Tìm kiếm</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PostSearch",
  inject: ["findTopics"],
  data: () => ({
    searchOptions: {
      search: "",
      topic_id: null,
      post_status: -1
    },
    topics: [
      {
        topic_id: null,
        topic_title: "Chọn chủ đề"
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
      &:not(:last-child) {
        margin-bottom: 0;
        margin-right: 1rem;
      }
    }
  }
}

.input {
  &--search {
    flex-grow: 1;
  }
}

.button-container {
  .button {
    width: 100%;
  }
  @include tablet {
    width: fit-content;
  }
}
</style>
