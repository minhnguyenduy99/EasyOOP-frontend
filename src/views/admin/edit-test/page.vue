<template>
  <div id="create-test-page">
    <admin-content title="Tạo bài test mới" icon="spell-check" iconPack="fas">
      <div v-if="test">
        <div id="form-group">
          <edit-test-form
            :formValid="areSentencesValid"
            :sentences="sentences"
            :test="test"
            :updated.sync="updated"
            submitButtonTitle="Cập nhật"
          />
        </div>
        <div class="py-5 ha-vertical-layout-7">
          <test-sentence-editable
            v-for="(sentence, index) in sentences"
            :key="sentence.id"
            :order="index"
            questionTitle="Câu hỏi"
            :sentence="sentence"
            :expand="false"
            saveOptionTitle="Thêm"
            scoreInputPlaceholder="Điểm"
            @validated="$on_sentenceValidatedChanged(index, $event)"
          >
            <template #add>
              <div class="buttons">
                <b-button
                  icon-right="save"
                  type="is-primary"
                  class="is-icon-button"
                  size="is-small"
                  @click="$on_saveButtonClicked(index)"
                />
              </div>
            </template>
          </test-sentence-editable>
        </div>
        <div class="is-flex is-justify-content-center">
          <b-button
            v-if="!lastPage"
            type="is-primary-light"
            class="has-text-weight-bold"
            @click="$on_loadButtonClicked"
            >Tải thêm</b-button
          >
        </div>
      </div>
    </admin-content>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ToastNotifier } from "../../../utils";
export default {
  name: "TestManagementPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "test-sentence-editable": () =>
      import("../components/test-sentence/test-sentence-editable"),
    "edit-test-form": () => import("./edit-test-form")
  },
  props: {
    testId: String
  },
  data: () => ({
    areSentencesValid: true,
    sentences: [],
    valids: [],
    test: null,
    page: 1,
    lastPage: false,
    updated: false
  }),
  mounted: function() {
    this.$_getTestById();
  },
  methods: {
    ...mapActions("TEST", [
      "updateSentence",
      "createSentence",
      "deleteSentences",
      "getTestById"
    ]),

    $on_loadButtonClicked() {
      this.$_getTestById();
    },

    $on_sentenceValidatedChanged(index, valid) {
      this.valids[index] = valid;
      if (
        (valid && this.areSentencesValid) ||
        (!valid && !this.areSentencesValid)
      ) {
        return;
      }
      this.areSentencesValid = this.valids.indexOf(false) === -1 ? true : false;
    },

    $on_saveButtonClicked(index) {
      const sentence = this.sentences[index];
      this.updateSentence({
        test_id: this.test.test_id,
        sentence_id: sentence.sentence_id,
        data: sentence
      }).then(result => {
        const { error } = result;
        if (error) {
          return;
        }
        this.updated = false;
        ToastNotifier.success(this.$buefy.toast, "Cập nhật câu hỏi thành công");
      });
    },

    $_removeSentence(index, removeHandler) {
      const sentence = this.sentences[index];
      const { test_id, sentence_id } = sentence;
      this.deleteSentences({
        test_id,
        sentencesIds: [sentence_id]
      }).then(result => {
        const { error } = result;
        if (error) {
          return;
        }
        this.updated = false;
        removeHandler(index);
      });
    },

    $_getTestById() {
      this.getTestById({
        test_id: this.testId,
        page: this.page,
        includeTest: this.page === 1
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        const { test, results, page, page_count } = data;
        this.test = test ?? this.test;
        this.sentences.push(...results);
        this.lastPage = page === page_count;
        this.page++;
      });
    }
  }
};
</script>
