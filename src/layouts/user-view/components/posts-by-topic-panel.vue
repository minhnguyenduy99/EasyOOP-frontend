<template>
  <div class="post-topic-panel p-5 is-page-responsive">
    <topic-panel
      v-for="topic in listTopics"
      :key="topic.id"
      :topicTitle="topic.topic_title"
      :to="item => ({ name: 'PostView', params: { post_id: item.post_id } })"
      :items="topic.list_posts"
      field="post_title"
      @navigate="$toggleDropdown()"
    />
  </div>
</template>

<script>
import { TopicPanel } from "@/components";
import { mapActions } from "vuex";

export default {
  components: {
    TopicPanel
  },
  inject: ["$toggleDropdown"],
  data: () => ({
    listTopics: []
  }),
  mounted: function() {
    this.$_getPostsByTopics();
  },
  methods: {
    ...mapActions("POST", ["getPostsGroupedByTopics"]),

    $_getPostsByTopics() {
      this.getPostsGroupedByTopics().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.listTopics.length = 0;
        this.listTopics.push(...data);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.post-topic-panel {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1.5rem;
  row-gap: 1.5rem;
  height: calc(100vh - 82px);
  overflow: auto;
  scroll-behavior: auto;

  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }

  @include desktop {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
