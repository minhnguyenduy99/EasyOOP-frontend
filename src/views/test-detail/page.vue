<template>
  <div v-if="test" id="test-detail-page">
    <div class="test-detail-container">
      <div class="ha-vertical-layout-7">
        <test-detail :test="test" @start="$on_testStarted" :state="state" />
        <div class="card">
          <div class="card-content">
            <sentence-panel
              v-if="isOnProgress"
              :sentences="sentences"
              :selectedOrder="selectedOrder"
              :sentencesPerGroup="sentencesPerGroup"
              :currentAnswerGroup="currentAnswerGroup"
              :currentPage="currentPage"
              :pageCount="pageCount"
            />
            <sentence-panel
              v-else-if="isFinished"
              :sentences="sentences"
              :showAnswer="true"
              :selectedOrder="selectedOrder"
              :sentencesPerGroup="sentencesPerGroup"
              :currentAnswerGroup="currentAnswerGroup"
              :currentPage="currentPage"
              :pageCount="pageCount"
            />
          </div>
        </div>
      </div>
      <div>
        <div id="sticky-test-info" class="ha-vertical-layout-7">
          <test-session-info
            v-if="!isFinished"
            :test="test"
            :state="state"
            :selectedOrder.sync="selectedOrder"
          />
          <test-result-info
            v-else-if="testResult"
            :testResult="testResult"
            :state="state"
            :selectedOrder.sync="selectedOrder"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { sessionStateProvider } from "./mixins/session-state.mixin";

export default {
  name: "TestDetailPage",
  components: {
    "test-detail": () => import("./test-detail-card"),
    "test-session-info": () => import("./test-session-info"),
    "test-result-info": () => import("./test-result-info"),
    "sentence-panel": () => import("@/components/sentence-panel/sentence-panel")
  },
  mixins: [sessionStateProvider(Vue)],
  props: {
    testId: String,
    sessionId: String
  },
  provide() {
    return {
      $_navigateToPage: this.$_navigatePage.bind(this)
    };
  },
  data: () => ({
    TEST_SESSION_STATES: {
      INIT: 0,
      ON_PROGRESS: 1,
      FINISHED: 2
    },
    SENTENCES_PER_PAGE: 10,
    test: null,
    testResult: null,
    sentences: [],
    selectedOrder: null
  }),
  created: function() {
    this.$_updateTest().then(() => {
      if (!this.sessionId) {
        return;
      }
      this.$_navigatePage(1);
    });
  },
  mounted: function() {
    this.$_registerWindowUnloadEvent();
    if (this.sessionId) {
      this.$on("session-ended", this.$_getTestResultBySession);
      this.$endSession();
      return;
    }
    this.$on("session-ended", this.$on_sessionEnd);
  },
  beforeDestroy() {
    this.$_unregisterWindowUnloadEvent();
  },
  watch: {
    testId() {
      this.state = this.TEST_SESSION_STATES.INIT;
      this.$_updateTest().then(() => {
        if (!this.sessionId) {
          return;
        }
        this.$_navigatePage(1);
      });
    }
  },
  computed: {
    ...mapGetters("VIEWER_TEST", [
      "sentencesPerGroup",
      "currentAnswerGroup",
      "currentPage",
      "pageCount",
      "totalAnswers"
    ])
  },
  methods: {
    ...mapActions("VIEWER_TEST", [
      "getTestById",
      "viewer_createTestResult",
      "getTestResultBySessionId",
      "navigateToPage"
    ]),

    async $_updateTest() {
      return this.getTestById(this.testId).then(result => {
        const { error, data } = result;
        if (error) {
          this.$router.push({ name: "PageNotFound" });
          return;
        }
        this.test = data;
      });
    },
    $_navigatePage(page) {
      return this.navigateToPage({
        page
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        const { results } = data;
        this.sentences.length = 0;
        this.sentences = results;
      });
    },
    $on_testStarted() {
      this.$startSession();
      this.$_navigatePage(1);
    },
    $on_sessionEnd() {
      this.viewer_createTestResult({
        test_id: this.testId,
        results: this.totalAnswers,
        save: false
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        const { data: testResult } = data;
        this.testResult = testResult;
        this.$_navigatePage(1);
      });
    },
    $_getTestResultBySession() {
      this.getTestResultBySessionId(this.sessionId).then(result => {
        const { error, data } = result;
        if (error) {
          this.$router.push({ name: "PageNotFound" });
          return;
        }
        const { data: testResult } = data;
        if (testResult.test_id !== this.testId) {
          this.$router.push({ name: "Home" });
        }
        this.testResult = testResult;
      });
    },
    $_registerWindowUnloadEvent() {
      window.addEventListener(
        "beforeunload",
        this.$_setupConfirmDialog.bind(this)
      );
    },
    $_unregisterWindowUnloadEvent() {
      window.removeEventListener("beforeunload", this.$_setupConfirmDialog);
    },
    $_setupConfirmDialog(e) {
      if (this.isOnInit) {
        return;
      }
      e.preventDefault();
      e.returnValue = "Bạn muốn rời trang này ?";
      return "Bạn muốn rời trang này ?";
    }
  }
};
</script>

<style scoped lang="scss">
@import "./style.scss";

#test-detail-page {
  scroll-behavior: smooth;
}

.test-detail-container {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1rem;
  @include tablet {
    grid-template-columns: 1fr auto;
    column-gap: 1rem;
  }
}

#sticky-test-info {
  position: sticky;
  top: 100px;
}
</style>
