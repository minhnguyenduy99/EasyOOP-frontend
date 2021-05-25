<script>
import { mapActions } from "vuex";
import { ToastNotifier } from "@/utils";
import TestForm from "../components/test-form/test-form";

export default {
  name: "CreateTestForm",
  extends: TestForm,
  inject: ["$p_loadPage"],
  methods: {
    ...mapActions("TEST", ["createTest", "createSentencesInBulk"]),

    async $on_submitted() {
      const form = await this.$validateForm();
      if (!form) {
        return;
      }

      this.$p_loadPage(true);

      const { sentences, ...test } = form;

      this.createTest(test).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        const {
          data: { test_id }
        } = data;
        this.$_submitSentences(test_id, sentences).then(success => {
          this.$p_loadPage(false);
          if (!success) {
            return;
          }
          this.$emit("submitted");
        });
      });
    },

    async $_submitSentences(testId, sentences) {
      let currentIndex = 0;
      const defaultPerJunk = 3;
      while (currentIndex < sentences.length) {
        const sentenceInJunk = sentences.slice(
          currentIndex,
          currentIndex + defaultPerJunk
        );
        const { error } = await this.createSentencesInBulk({
          sentences: sentenceInJunk,
          test_id: testId
        });
        if (error) {
          ToastNotifier.error(this.$buefy.toast, error);
          return false;
        }
        ToastNotifier.success(this.$buefy.toast, "Tạo hỏi thành công");
        currentIndex += defaultPerJunk;
      }
      return true;
    }
  }
};
</script>
