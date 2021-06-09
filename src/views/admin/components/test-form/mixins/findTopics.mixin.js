import { mapActions } from "vuex";

export default {
  data: () => ({
    topics: []
  }),
  methods: {
    ...mapActions("TEST", ["getAllTopics"]),

    $_requestTopics() {
      this.getAllTopics().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.topics.length = 0;
        this.topics.push(...data);
      });
    }
  }
};
