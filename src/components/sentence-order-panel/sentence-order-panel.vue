<template>
  <div class="list-sentences-panel">
    <div class="panel-container">
      <b-button
        v-for="(answer, index) in answers"
        :key="answer.id"
        :size="getSizeOfSentence"
        :disabled="disabled"
        :type="buttonType(answer, index)"
        class="is-icon-button is-rounded"
        @click="$on_click(index)"
        >{{ index + 1 }}</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "SentenceOrderPanel",
  props: {
    disabled: Boolean,
    answers: Array,
    buttonType: {
      type: Function,
      default: (answer, index) => (answer.answered ? "is-dark" : "is-light")
    }
  },
  computed: {
    getSizeOfSentence() {
      if (this.answers.length < 10) {
        return "is-medium";
      }
      return "is-small";
    }
  },
  methods: {
    $on_click(index) {
      this.$emit("selected", index + 1);
    }
  }
};
</script>

<style scoped lang="scss">
$is-selected: brown;
$count-per-row: 6;

.panel-container {
  display: grid;
  grid-template-columns: repeat($count-per-row, 1fr);
  gap: 1rem;
}
</style>
