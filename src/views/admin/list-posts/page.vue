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
        <post-search @search="onSearch" />
        <post-table v-model="searching" :filter="searchOptions" class="mt-4" />
      </div>
    </admin-content>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ListPostsPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "admin-content-header": () =>
      import("../components/admin-content/admin-content-header.vue"),
    "post-search": () => import("./post-search"),
    "post-table": () => import("./post-table")
  },
  provide() {
    return {
      findPosts: this.creator_findPosts,
      deletePost: this.creator_deletePost,
      findTopics: this.searchTopics
    };
  },
  data: () => ({
    title: "Danh sách bài viết",
    searchOptions: {},
    searching: false
  }),
  methods: {
    ...mapActions("POST", [
      "getPosts",
      "searchTopics",
      "creator_deletePost",
      "creator_findPosts"
    ]),

    onSearch(searchOptions) {
      this.searchOptions = searchOptions;
      this.searching = true;
    }
  }
};
</script>
