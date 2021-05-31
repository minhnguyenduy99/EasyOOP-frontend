export default {
  props: {
    testResult: {
      test_id: String,
      results: Array,
      total_score: Number,
      obtained_score: Number,
      correct_answer_count: Number,
      total_sentence_count: Number,
      limited_time: Number
    }
  },
  computed: {
    isTimeLimited() {
      return this?.testResult?.type === 1;
    },
    limitedTimeInMinutes() {
      return Math.floor(this.testResult.limited_time / 60);
    }
  }
};
