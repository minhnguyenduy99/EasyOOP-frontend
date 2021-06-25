<template>
  <div id="post-detail-page">
    <div v-if="post" class="hero is-fullheight-with-navbar">
      <div class="hero-body is-relative">
        <div class="hero-background__container">
          <div class="hero-background__overlay"></div>
          <div class="hero-background__image">
            <img :src="post.thumbnail_file_url" />
          </div>
        </div>
        <div class="hero-background__content">
          <post-info :post="post" />
        </div>
      </div>
    </div>
    <div class="post-main-body">
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
        >
          <template #header>
            <div></div>
          </template>
        </post-view-detail>
      </section>
    </div>
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
      import("@/components/topic-list/topic-list-item.vue"),
    "post-info": () => import("./post-info.vue")
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
      this.$_requestPost().then(success => {
        if (!success) {
          this.$p_loadPage(false);
          this.$router.push({
            name: "PageNotFound"
          });
          return;
        }
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
          return false;
        }
        this.post = data;
        return true;
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
$hero-offset: 100px;

.post-main-body {
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
      max-width: 80%;
    }
  }
}

.hero-background {
  &__container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__overlay,
  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 100px);
  }

  &__overlay {
    z-index: 3;
    opacity: 0.7;
    background: black;
  }

  &__image {
    display: flex;
    justify-content: center;
    filter: blur(4px);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    user-select: none;
    img {
      width: auto;
      height: 100%;
    }
  }

  &__content {
    align-self: flex-end;
    width: 95%;
    margin: 0 auto;
    z-index: 4;
  }
}
</style>
