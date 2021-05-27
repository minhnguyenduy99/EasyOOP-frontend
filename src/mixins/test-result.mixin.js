export default {
  props: {
    testResult: {
      test_id: String,
      results: Array,
      total_score: Number,
      obtained_score: Number,
      correct_answer_count: Number,
      total_sentence_count: Number
    }
  }
};
