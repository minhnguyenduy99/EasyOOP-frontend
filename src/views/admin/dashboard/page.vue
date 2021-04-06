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
import { mapActions } from "vuex";
import { AdminContent, AdminContentHeader } from "../../../components";
import AdminPostSearch from "./admin-post-search";

export default {
  name: "DashboardPage",
  components: {
    AdminContent,
    AdminContentHeader,
    AdminPostSearch,
    "admin-post-table": () => import("./dashboard-post-table")
  },
  provide() {
    return {
      findPosts: this.$api.posts.getPostsByStatus,
      deletePost: this.deletePost,
      findTopics: this.searchTopics
    };
  },
  data: () => ({
    title: "Danh sách bài viết",
    searchOptions: {},
    searching: false
  }),
  methods: {
    ...mapActions("POST", ["getPosts", "deletePost"]),
    ...mapActions("TOPIC", ["searchTopics"]),

    onSearch(searchOptions) {
      this.searchOptions = searchOptions;
      this.searching = true;
    }
  }
};
</script>
