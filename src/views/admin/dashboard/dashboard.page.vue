<template>
  <div id="dashboard-page">
    <admin-content>
      <template #header>
        <admin-content-header :title="title" icon="clipboard" iconPack="fas">
          <template #action>
            <b-button type="is-primary" outlined>
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
import { AdminContent, AdminContentHeader } from "../../../components";
import AdminPostSearch from "./admin-post-search";

const posts = [
  {
    post_id: "post_id",
    post_title: "Học OOP như thế nào ?",
    topic_title: "CƠ BẢN",
    created_date: Date.now()
  },
  {
    post_id: "post_id",
    post_title: "Học OOP như thế nào ?",
    topic_title: "CƠ BẢN",
    created_date: Date.now()
  },
  {
    post_id: "post_id",
    post_title: "Học OOP như thế nào ?",
    topic_title: "CƠ BẢN",
    created_date: Date.now()
  },
  {
    post_id: "post_id",
    post_title: "Học OOP như thế nào ?",
    topic_title: "CƠ BẢN",
    created_date: Date.now()
  }
];

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
      return {
        error: null
      };
    },
    async $mock_findTopcis() {
      return new Promise(resolve => {
        setTimeout(
          function() {
            resolve({
              data: [
                {
                  topic_id: "topicid1",
                  topic_title: "Khái niệm"
                },
                {
                  topic_id: "topicid2",
                  topic_title: "Nguyên lí SOLID"
                },
                {
                  topic_id: "topicid3",
                  topic_title: "Phương pháp xây dựng class"
                }
              ]
            });
          }.bind(this),
          300
        );
      });
    }
  }
};
</script>
