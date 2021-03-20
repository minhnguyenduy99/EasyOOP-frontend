export default {
  props: {
    topic: {
      topic_id: String,
      topic_title: String,
      topic_description: String,
      first_post_id: String
    }
  },
  computed: {
    _isTopicEmpty() {
      return !this.topic.first_post_id;
    }
  }
};
