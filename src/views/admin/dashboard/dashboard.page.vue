<template>
  <div id="dashboard-page">
    <admin-content>
      <template #header>
        <admin-content-header :title="title" icon="clipboard" iconPack="fas">
          <template #action>
            <b-button
              type="is-primary"
              outlined
              tag="router-link"
              :to="{ name: 'CreatePost' }"
            >
              Tạo bài viết mới
            </b-button>
          </template>
        </admin-content-header>
      </template>
      <div id="post-area">
        <admin-post-search @search="onSearch" />
        <admin-post-table
          v-model="searching"
          :filter="searchOptions"
          class="mt-4"
        />
      </div>
    </admin-content>
  </div>
</template>

<script>
import { posts, topics } from "../data.mock";
import { AdminContent, AdminContentHeader } from "../../../components";
import AdminPostSearch from "./admin-post-search";

export default {
  components: {
    AdminContent,
    AdminContentHeader,
    AdminPostSearch,
    "admin-post-table": () => import("./dashboard-post-table")
  },
  provide() {
    return {
      findPosts: this.$mock_findPosts,
      deletePost: this.$mock_deletePost,
      findTopics: this.$mock_findTopcis
    };
  },
  data: () => ({
    title: "Danh sách bài viết",
    searchOptions: {},
    searching: false
  }),
  methods: {
    onSearch(searchOptions) {
      this.searchOptions = searchOptions;
      this.searching = true;
    },
    $mock_findPosts(page, options) {
      return new Promise(resolve => {
        setTimeout(
          function() {
            resolve({
              data: {
                total_count: 10,
                results: posts
              }
            });
          }.bind(this),
          1000
        );
      });
    },
    async $mock_deletePost(postId) {
      return new Promise(resolve => {
        setTimeout(
          function() {
            resolve({
              error: null
            });
          }.bind(this),
          3000
        );
      });
    },
    async $mock_findTopcis() {
      return new Promise(resolve => {
        setTimeout(
          function() {
            resolve({
              data: topics
            });
          }.bind(this),
          300
        );
      });
    }
  }
};
</script>
