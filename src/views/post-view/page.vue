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
      <post-view
        v-if="post"
        :post="post"
        index-sticky-top="50px"
        index-title="Mục lục"
        empty-text="Không có mục lục"
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
    "post-view": () => import("@/components/post-preview/post-preview.vue"),
    "topic-list-item": () =>
      import("@/components/topic-list/topic-list-item.vue")
  },
  props: {
    postId: String
  },
  data: () => ({
    post: null,
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
      this.$_requestPost();
    }
  },
  mounted: function() {
    this.$_requestPost().then(() => {
      this.$_getListPostsOfTopic(this.post.topic_id);
    });
  },
  methods: {
    ...mapActions("POST", ["getPostById", "getPostsByTopic"]),
    async $_requestPost() {
      return this.getPostById(this.postId).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.post = data;
      });
    },
    $_getListPostsOfTopic(topicId) {
      this.getPostsByTopic({ topicId }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.topic = data;
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

  #list-posts-section {
    display: none;
  }

  @include tablet {
    display: flex;
    justify-content: space-between;

    #list-posts-section {
      display: block;
      position: sticky;
      top: 50px;
      left: 0;
      height: fit-content;
      flex-basis: 20%;
    }

    #post-view-section {
      flex-basis: 77%;
    }
  }
}
</style>
