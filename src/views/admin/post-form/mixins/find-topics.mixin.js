export default {
  inject: ["$api_findTopics"],
  data: () => ({
    topics: []
  }),
  methods: {
    async $m_findTopics() {
      return this.$api_findTopics({}).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.topics.push(...data);
      });
    }
  }
};
