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
      <div class="buttons is-justify-content-space-between">
        <b-button
          :icon-left="saved ? 'check' : null"
          type="is-primary"
          @click="$on_saveResultButtonClicked"
          >{{ saved ? "Đã lưu" : "Lưu kết quả" }}</b-button
        >
        <b-button
          type="is-primary"
          outlined
          tag="router-link"
          :to="{ name: 'PersonalTestResults' }"
          >Danh sách kết quả</b-button
        >
      </div>
      <hr />
      <sentence-order-panel
        :answers="testResult.results"
        @selected="$on_sentenceSelected"
        :buttonType="$_buttonTypeHandler"
      />
    </div>
    <b-modal v-if="!isAuthenticated" v-model="showLoginModal">
      <template>
        <modal-form title="Đăng nhập" has-card>
          <login-form />
        </modal-form>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ToastNotifier } from "../../utils";
import { sessionStateInjector } from "./mixins/session-state.mixin";

export default {
  name: "TestResultInfo",
  components: {
    "sentence-order-panel": () =>
      import("@/components/sentence-order-panel/sentence-order-panel"),
    "login-form": () => import("@/components/login-form/login-form.vue"),
    "modal-form": () => import("@/components/modal-form")
  },
  mixins: [sessionStateInjector()],
  inject: ["$_navigateToPage", "$p_showLoginModal"],
  props: {
    testResult: {
      type: Object,
      default: () => null
    },
    selectedOrder: Number
  },
  data: () => ({
    showLoginModal: false,
    saved: false
  }),
  computed: {
    ...mapGetters("VIEWER_TEST", [
      "answerGroups",
      "sentencesPerGroup",
      "pageOfSentence",
      "currentPage",
      "totalAnswers"
    ]),
    ...mapGetters("AUTH", ["isAuthenticated"]),
    correctSentenceText() {
      const { total_sentence_count, correct_answer_count } = this.testResult;
      return `${correct_answer_count} / ${total_sentence_count}`;
    },
    obtainedScoreText() {
      const { obtained_score, total_score } = this.testResult;
      return `${obtained_score} / ${total_score}`;
    }
  },
  watch: {
    testResult(val) {
      if (!val) {
        return;
      }
      this.$_mappingAnswers();
    },
    isAuthenticated(val) {
      console.log("auth changed");
      if (!val) {
        return;
      }
      this.$_saveTestResult();
    }
  },
  methods: {
    ...mapActions("VIEWER_TEST", ["viewer_createTestResult"]),
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
    $on_navigateToResultsPage() {
      this.$router.push({
        name: "PersonalTestResults"
      });
    },
    $on_saveResultButtonClicked() {
      if (this.isAuthenticated) {
        this.$_saveTestResult();
        return;
      }
      this.$p_showLoginModal();
    },
    $_buttonTypeHandler(sentence, index) {
      const { answer, user_answer, answered } = sentence;
      return !answered
        ? "is-light"
        : answer === user_answer
        ? "is-success"
        : "is-danger";
    },
    $_saveTestResult() {
      const { test_id, results } = this.testResult;
      this.viewer_createTestResult({ test_id, results, save: true }).then(
        result => {
          const { error, data } = result;
          if (error) {
            return;
          }
          this.saved = true;
          ToastNotifier.success(this.$buefy.toast, "Lưu kết quả thành công");
        }
      );
    }
  }
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
