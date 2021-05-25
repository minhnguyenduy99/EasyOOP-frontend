export default {
  props: {
    test: {
      title: String,
      type: Number,
      limited_time: Number,
      default_score_per_sentence: Number,
      sentences: Array
    }
  },
  computed: {
    isTimeLimited() {
      return this?.test?.type === this.TEST_TYPES.LIMITED_TIME;
    },
    numberOfSentences() {
      return this.test?.sentences?.length;
    },
    totalScore() {
      const sentences = this.test?.sentences;
      return sentences.reduce(
        (pre, cur) =>
          pre +
          (cur.score === 0 ? this.test?.default_score_per_sentence : cur.score),
        0
      );
    }
  }
};
