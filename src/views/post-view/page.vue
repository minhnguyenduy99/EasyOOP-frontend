<template>
  <div id="post-detail-page">
    <section id="list-posts-section">
      <topic-list-item
        v-if="topic"
        :topic="topic"
        :active-post-id="postId"
        :to="$_getNavigateView"
      />
    </section>
    <section id="post-view-section">
      <post-view-detail
        v-if="post"
        :post="post"
        index-sticky-top="100px"
        index-title="Mục lục"
        empty-text="Không có mục lục"
        :hasViewIndex="true"
        indexLevels="h3"
        :navigate="$_navigateToPost"
      />
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PostViewPage",
  components: {
    "post-view-detail": () =>
      import("@/components/post-preview/post-view-detail.vue"),
    "topic-list-item": () =>
      import("@/components/topic-list/topic-list-item.vue")
  },
  inject: ["$p_loadPage"],
  props: {
    postId: String
  },
  data: () => ({
    post: null,
    listPosts: [],
    topic: null
  }),
  watch: {
    postId(val) {
      if (!val) {
        this.$router.push({
          name: "Home"
        });
        return;
      }
      this.$_requestData();
    }
  },
  computed: {
    isCurrentPostInTheSameTopic() {
      return (
        this.listPosts.findIndex(post => post.post_id === this.postId) !== -1
      );
    }
  },
  mounted: function() {
    this.$_requestData();
  },
  methods: {
    ...mapActions("POST", ["getPostById", "getPostsByTopic"]),

    async $_requestData() {
      this.$p_loadPage(true);
      this.$_requestPost().then(() => {
        if (this.isCurrentPostInTheSameTopic) {
          this.$p_loadPage(false);
          return;
        }
        this.$_getListPostsOfTopic(this.post.topic_id).then(() => {
          this.$p_loadPage(false);
        });
      });
    },
    async $_requestPost() {
      return this.getPostById(this.postId).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.post = data;
      });
    },
    async $_getListPostsOfTopic(topicId) {
      return this.getPostsByTopic({ topicId }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.topic = data;
        this.listPosts.length = 0;
        this.listPosts.push(...data.list_posts);
      });
    },
    $_navigateToPost(postId) {
      this.$router.push({
        name: "PostView",
        params: {
          post_id: postId
        }
      });
    },
    $_getNavigateView(post) {
      return {
        name: "PostView",
        params: {
          post_id: post.post_id
        }
      };
    }
  }
};
</script>

<style scoped lang="scss">
#post-detail-page {
  position: relative;
  padding: 2rem 1rem;

  #list-posts-section {
    display: none;
  }

  @include tablet {
    padding: 2rem 1rem;
  }

  @include desktop {
    display: flex;
    justify-content: space-between;

    #list-posts-section {
      display: block;
      position: sticky;
      top: 100px;
      left: 0;
      height: fit-content;
      max-width: 17%;
    }

    #post-view-section {
      flex-basis: 80%;
    }
  }
}
</style>
