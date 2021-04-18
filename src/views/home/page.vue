<template>
  <div id="home-page">
    <div id="latest-posts-section" class="card">
      <div class="card-header">
        <div class="card-header-title has-background-primary-light">
          <span class="is-size-5 has-text-light has-text-weight-bold"
            >Bài viết mới nhất</span
          >
        </div>
      </div>
      <div class="card-content p-0">
        <div>
          <post-view
            v-for="post in posts"
            :key="post.id"
            :post="post"
            @click="$_navigateToPostView"
          />
        </div>
      </div>
    </div>
    <div
      id="right-section"
      v-if="topics.length > 0"
      class="ha-vertical-layout-3"
    >
      <div id="topic-panel">
        <topic-detail
          v-for="topic in topics"
          :key="topic.id"
          :topic="topic"
          startButtonLabel="Bắt đầu học"
          empty-text="Chưa có bài học nào"
        />
      </div>
      <div id="common-question-section" class="card">
        <div class="card-content">
          <h1 class="has-text-weight-bold is-size-4">CÁC CÂU HỎI THƯỜNG GẶP</h1>
          <div class="mt-5 ha-vertical-layout-5">
            <qanda-card
              v-for="question in questions"
              :key="question.id"
              :qanda="question"
              :open="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {
    "topic-detail": async () => import("./topic-detail/topic-detail"),
    "qanda-card": async () => (await import("../../components")).QandACard,
    "post-view": () => import("./post-view")
  },
  name: "Home",
  data: () => ({
    posts: [],
    topics: [],
    questions: []
  }),
  mounted: function() {
    this.$_getPosts();
    this.$_getTopics();
  },
  methods: {
    ...mapActions("POST", ["getPosts", "searchTopics"]),
    $_getPosts() {
      this.getPosts({
        page: 1,
        searchOptions: {
          sort_by: "created_date",
          sort_order: "desc"
        }
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        const { results } = data;
        this.posts.push(...results);
      });
    },
    $_getTopics() {
      this.searchTopics().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.topics.push(...data);
      });
    },
    $_navigateToPostView(post) {
      this.$router.push({
        name: "PostView",
        params: {
          post_id: post.post_id
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
#home-page {
  position: relative;
  display: flex;
  justify-content: space-between;

  #latest-posts-section {
    flex-basis: 25%;
    position: sticky;
    top: 100px;
    left: 0;
  }

  #right-section {
    flex-basis: 72%;
  }
}

#topic-panel {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem 1rem;

  @include tablet {
    grid-template-columns: 1fr 1fr;
  }

  @include desktop {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
