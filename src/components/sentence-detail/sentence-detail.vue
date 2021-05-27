<template>
  <div class="sentence-detail ha-vertical-layout-5">
    <div>
      <span :class="orderTitleClass">{{ questionOrderTitle }}: </span>
      <span>{{ sentence.question }}</span>
    </div>
    <div>
      <div
        v-if="showAnswer"
        class="ha-vertical-layout-6 is-flex is-flex-direction-column"
      >
        <div
          v-for="(option, index) in sentence.options"
          :key="option.id"
          class="is-flex is-align-items-center"
        >
          <b-radio
            type="is-primary-light"
            :native-value="index"
            v-model="userAnswer.user_answer"
          >
            {{ option }}
          </b-radio>
          <b-icon
            v-if="index === sentence.answer"
            :icon="correctIcon"
            type="is-success"
          />
          <b-icon
            v-else-if="index === userAnswer.user_answer"
            :icon="wrongIcon"
            type="is-danger"
          />
        </div>
      </div>
      <div v-else class="ha-vertical-layout-7 is-flex is-flex-direction-column">
        <b-radio
          v-for="(option, index) in sentence.options"
          :key="option.id"
          type="is-primary-light"
          :native-value="index"
          v-model="answer"
        >
          {{ option }}
        </b-radio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleHandler: Function,
    order: Number,
    sentence: Object,
    userAnswer: {
      type: Object,
      default: () => ({
        sentence_id: null,
        user_answer: -1
      })
    },
    wrongIcon: {
      type: String,
      default: () => "times"
    },
    correctIcon: {
      type: String,
      default: () => "check"
    },
    showAnswer: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    orderTitleClass: {
      type: String,
      default: () => "has-text-weight-bold"
    }
  },
  data: () => ({
    answer: -1
  }),
  mounted: function() {
    if (this.showAnswer) {
      this.answer = this.sentence.answer;
      return;
    }
    this.answer = this.userAnswer?.user_answer ?? -1;
  },
  computed: {
    questionOrderTitle() {
      return this.titleHandler?.(this.order) ?? "";
    }
  },
  watch: {
    answer(val, oldVal) {
      if (this.showAnswer) {
        this.answer = this.sentence.answer;
        return;
      }
      this.userAnswer.user_answer = val;
      this.userAnswer.answered = true;
      // trigger when the option is selected for the first time
      if (oldVal === -1) {
        this.$emit("selected");
      }
    }
  },
  methods: {
    $on_input(index) {
      if (index === this.answer) {
        this.answer = null;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.sentence-option {
  &.--wrong {
    span {
      color: black;
    }
  }
}
</style>
