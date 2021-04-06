<template>
  <div class="home">
    <div v-if="topics.length > 0" class="ha-vertical-layout-3">
      <div id="topic-panel">
        <topic-detail
          v-for="topic in topics"
          :key="topic.id"
          :topic="topic"
          startButtonLabel="Bắt đầu học"
          :navigate-first-post="$_navigateFirstPost"
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
export default {
  components: {
    "topic-detail": async () =>
      (await import("../../components"))["TopicDetail"],
    "qanda-card": async () => (await import("../../components")).QandACard
  },
  name: "Home",
  data: () => ({
    topics: [],
    questions: []
  }),
  mounted: function() {
    this.$api.topics.findTopics().then(result => {
      const { data } = result;
      this.topics.push(...data);
    });
    this.$api.qanda.findQuestions().then(result => {
      const { data } = result;
      this.questions.push(...data);
    });
  },
  methods: {
    $_navigateFirstPost(postId) {
      this.$router.push({
        name: "PostView",
        params: { post_id: postId }
      });
    }
  }
};
</script>

<style scoped lang="scss">
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
