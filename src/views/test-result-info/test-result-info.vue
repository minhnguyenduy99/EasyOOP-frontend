<template>
  <div class="panel is-primary-light test-result-info">
    <p class="panel-heading">
      KẾT QUẢ
    </p>
    <div class="p-3 ha-vertical-layout-6">
      <div class="ha-vertical-layout-6 py-3">
        <div class="test-field large">
          <span class="test-field-label">Số lượng câu đúng </span>
          <span class="test-field-value">{{ correctSentenceText }}</span>
        </div>
        <div class="test-field large">
          <span class="test-field-label">Số điểm đạt được </span>
          <span class="test-field-value">{{ obtainedScoreText }}</span>
        </div>
      </div>
      <hr />
      <sentence-order-panel
        :answers="testResult.results"
        @selected="$on_sentenceSelected"
        :buttonType="$_buttonTypeHandler"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TestResultInfo",
  components: {
    "sentence-order-panel": () =>
      import("@/components/sentence-order-panel/sentence-order-panel")
  },
  inject: ["$_navigateToPage", "$p_showLoginModal"],
  props: {
    testResult: {
      type: Object,
      default: () => null
    },
    page: Number,
    pageCount: Number
  },
  data: () => ({
    showLoginModal: false
  }),
  computed: {
    correctSentenceText() {
      const { total_sentence_count, correct_answer_count } = this.testResult;
      return `${correct_answer_count} / ${total_sentence_count}`;
    },
    obtainedScoreText() {
      const { obtained_score, total_score } = this.testResult;
      return `${obtained_score} / ${total_score}`;
    }
  },
  methods: {
    $on_sentenceSelected(order) {
      this.$emit("order-selected", order);
    },
    $_buttonTypeHandler(sentence, index) {
      const { answer, user_answer, answered } = sentence;
      return !answered
        ? "is-light"
        : answer === user_answer
        ? "is-success"
        : "is-danger";
    }
  }
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
