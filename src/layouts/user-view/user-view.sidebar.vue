<template>
  <div id="user-view-sidebar-content">
    <div v-if="topics.length > 0">
      <topic-list
        :topics="topics"
        :to="$_nagivateToPost"
        :active-post-id="currentPostId"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "topic-list": async () => (await import("../../components"))["TopicList"]
  },
  props: {
    currentPostId: String
  },
  inject: ["$api_getPostsGroupedByTopics"],
  data: () => ({
    topics: []
  }),
  mounted: function() {
    this.$api_getPostsGroupedByTopics().then(result => {
      const { error, data } = result;
      if (error) {
        return;
      }
      const { results } = data;
      this.topics.length = 0;
      this.topics.push(...results);
    });
  },
  methods: {
    $_nagivateToPost(post) {
      return {
        name: "PostDetail",
        params: {
          post_id: post.post_id
        }
      };
    }
  }
};
</script>
