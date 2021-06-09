export default {
  data: () => ({
    TEST_TYPES: {
      LIMITED_TIME: 1,
      UNLIMITED_TIME: 2
    },
    formData: {
      title: "",
      type: 2,
      topic_id: null,
      limited_time: 0,
      default_score_per_sentence: 10
    },
    limitedTime: {
      hour: 0,
      minute: 0
    }
  }),
  computed: {
    isTimeLimited() {
      return this.formData.type === this.TEST_TYPES.LIMITED_TIME;
    },
    limitedTimeInSeconds() {
      const { hour, minute } = this.limitedTime;
      return hour * 3600 + minute * 60;
    }
  }
};
