<template>
  <div class="panel is-primary-light">
    <p class="panel-heading">
      THÔNG TIN BÀI TEST
    </p>
    <div class="p-5 ha-vertical-layout-5">
      <div
        v-if="!isFinished"
        class="is-flex is-flex-direction-column ha-vertical-layout-6"
      >
        <div class="test-field">
          <span class="test-field-label">Thời gian còn lại</span>
          <span v-if="isTimeLimited" class="test-field-value">{{
            expired ? expiredMessage : formattedDueTime
          }}</span>
          <span class="test-field-value" v-else>Không giới hạn</span>
        </div>
        <div class="test-field">
          <span class="test-field-label">Số câu còn lại</span>
          <span class="test-field-value">{{ unansweredSentenceCount }}</span>
        </div>
        <b-button
          v-if="isOnProgress"
          type="is-danger"
          class="is-align-self-flex-end"
          @click="$on_submitButtonClicked"
          >Nộp bài</b-button
        >
      </div>
      <div v-else class="ha-vertical-layout-6">
        <div class="test-field">
          <span class="test-field-label">Số lượng câu đúng </span>
          <span class="test-field-value">{{ correctSentenceText }}</span>
        </div>
        <div class="test-field">
          <span class="test-field-label">Số điểm đạt được </span>
          <span class="test-field-value">{{ obtainedScoreText }}</span>
        </div>
      </div>
      <hr />
      <sentence-order-panel
        :disabled="!isOnProgress"
        :answers="totalAnswers"
        @selected="$on_sentenceSelected"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sessionStateInjector } from "./mixins/session-state.mixin";

export default {
  name: "TestSessionInfo",
  components: {
    "sentence-order-panel": () =>
      import("@/components/sentence-order-panel/sentence-order-panel")
  },
  mixins: [sessionStateInjector()],
  inject: ["$_navigateToPage"],
  props: {
    test: {
      type: Object,
      default: () => null
    },
    selectedOrder: Number
  },
  data: () => ({
    timer: null,
    dueTime: 0,
    expired: false
  }),
  mounted: function() {
    if (!this.test) {
      return;
    }
    this.dueTime = this.test.limited_time;
  },
  watch: {
    test(val) {
      if (!val) {
        return;
      }
      this.dueTime = this.test.limited_time;
    },
    state(val) {
      if (!val) {
        return;
      }
      this.$_startTimer();
    }
  },
  computed: {
    ...mapGetters("VIEWER_TEST", [
      "answerGroups",
      "sentencesPerGroup",
      "pageOfSentence",
      "currentPage",
      "totalAnswers"
    ]),

    numberOfSentences() {
      return this.test?.sentence_count;
    },
    unansweredSentenceCount() {
      return this.totalAnswers.filter(answer => !answer.answered).length;
    },
    expiredMessage() {
      return "Hết thời gian";
    },
    isTimeLimited() {
      return this.test.type === 1;
    },
    formattedDueTime() {
      const hour = Math.floor(this.dueTime / 3600);
      const minute = Math.floor((this.dueTime - hour * 3600) / 60);
      const second = this.dueTime - hour * 3600 - minute * 60;
      return (
        hour.toString() +
        ":" +
        minute.toString().padStart(2, "0") +
        ":" +
        second.toString().padStart(2, "0")
      );
    },
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
    $on_submitButtonClicked() {
      this.$buefy.dialog.confirm({
        title: "Nộp bài",
        message: `Bạn chắc chắc muốn nộp ?</br>Bạn vẫn còn <b>${this.unansweredSentenceCount}</b> câu chưa trả lời`,
        cancelText: "Hủy",
        confirmText: "Nộp bài",
        type: "is-danger",
        hasIcon: true,
        icon: "times-circle",
        iconPack: "fa",
        onConfirm: () => {
          this.$_finishTest();
        }
      });
    },
    $on_sentenceSelected(order) {
      const page = this.pageOfSentence(order);
      if (page === this.currentPage) {
        this.$emit("update:selectedOrder", order);
        return;
      }
      this.$_navigateToPage(page).then(() => {
        this.$nextTick(() => {
          this.$emit("update:selectedOrder", order);
        });
      });
    },
    $_startTimer() {
      if (!this.isTimeLimited) {
        return;
      }
      this.timer = setInterval(() => {
        this.dueTime--;
        this.$nextTick(() => {
          if (this.dueTime === 55) {
            this.$_finishTest();
          }
        });
      }, 1000);
    },
    $_finishTest() {
      clearInterval(this.timer);
      this.timer = null;
      this.$endSession();
    }
  }
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
