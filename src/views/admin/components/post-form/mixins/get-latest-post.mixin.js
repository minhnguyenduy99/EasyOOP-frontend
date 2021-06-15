export default ({ mapActions }) => ({
  data: () => ({
    latestPost: null,
    loadLatestPost: false
  }),
  methods: {
    ...mapActions("POST", ["creator_getLatestPostOfTopic"]),

    async $m_getLatestPostOfTopic(topicId) {
      this.loadLatestPost = true;
      this.creator_getLatestPostOfTopic({ topicId }).then(result => {
        const { error, data } = result;
        this.loadLatestPost = false;
        if (error) {
          return;
        }
        this.latestPost = data?.[0];
      });
    }
  }
});
