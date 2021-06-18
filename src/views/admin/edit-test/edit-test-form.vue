<script>
import { mapActions } from "vuex";
import { ToastNotifier } from "@/utils";
import TestForm from "../components/test-form/test-form";

export default {
  name: "EditTestForm",
  components: {
    "test-form": () => import("../components/test-form/test-form")
  },
  extends: TestForm,
  props: {
    test: {
      type: Object,
      default: () => null
    },
    updated: {
      type: Boolean,
      default: () => false
    }
  },
  inject: ["$p_loadPage"],
  mounted: function() {
    if (!this.test) {
      return;
    }
    this.$_requestTopics();
    const {
      default_score_per_sentence,
      limited_time,
      type,
      title,
      topic_id
    } = this.test;
    this.formData = {
      title,
      type,
      topic_id,
      default_score_per_sentence,
      limited_time
    };
    this.$_updateLimitedTime();
    this.$_updateTestInfo();
  },
  data: () => ({
    testScore: 0,
    totalCount: 0
  }),
  computed: {
    totalScore() {
      return this.testScore;
    },
    numberOfSentences() {
      return this.totalCount;
    }
  },
  watch: {
    updated(val) {
      if (val) {
        return;
      }
      this.$_updateTestInfo();
    }
  },
  methods: {
    ...mapActions("TEST", ["updateTest", "getTotalScoreOfTest"]),

    async $on_submitted() {
      const form = await this.$validateForm();

      if (!form) {
        return;
      }

      this.$p_loadPage(true);

      this.updateTest({ test_id: this.test.test_id, data: form }).then(
        result => {
          this.$p_loadPage(false);
          const { error } = result;
          if (error) {
            return;
          }
          this.$_updateTestInfo();
        }
      );
    },

    async $_updateTestInfo() {
      this.getTotalScoreOfTest({ test_id: this.test.test_id }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.testScore = data.total_score;
        this.totalCount = data.sentence_count;
        this.$emit("update:updated", !this.updated);
      });
    },

    $_updateLimitedTime() {
      const { type, limited_time } = this.test;
      if (type === this.TEST_TYPES.UNLIMITED_TIME) {
        return;
      }
      const hour = Math.floor(limited_time / 3600);
      const minute = (limited_time - hour * 3600) / 60;
      this.limitedTime = {
        hour,
        minute
      };
    }
  }
};
</script>
