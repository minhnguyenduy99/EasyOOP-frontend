export default {
  props: {
    test: {
      title: String,
      limited_time: Number,
      default_score_per_sentence: Number,
      sentences: Array
    }
  },
  computed: {
    isTimeLimited() {
      return this?.test?.type === 1;
    },
    limitedTimeInMinutes() {
      return Math.floor(this.test.limited_time / 60);
    },
    numberOfSentences() {
      return this.test?.sentence_count;
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
