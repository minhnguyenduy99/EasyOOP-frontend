import { FunctionDelayer } from "@/utils";

export default {
  inject: ["$api_findPosts"],
  data: () => ({
    DEFAULT_POST: {
      post_id: null,
      post_title: "Đây là bài viết đầu tiên"
    },
    postSearcher: new FunctionDelayer(),
    filteredPostList: [],
    searchPostValue: ""
  }),
  watch: {
    searchPostValue(val) {
      if (!val) {
        return;
      }
      this.postSearcher.execute(() => this.$_findPosts(this.form?.topic_id));
    }
  },
  methods: {
    async $_findPosts(topicId = null) {
      this.$api_findPosts({
        searchOptions: {
          search: this.searchPostValue,
          topic_id: topicId
        }
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$_updatePostList(data);
      });
    },
    async $_updatePostList(data) {
      this.filteredPostList.length = 0;
      const { results } = data;
      this.filteredPostList.push(...results);
    }
  }
};
