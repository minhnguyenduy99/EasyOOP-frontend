<template>
  <div class="sentence-panel ha-vertical-layout-7">
    <div class="is-flex is-justify-content-flex-end">
      <div class="buttons">
        <b-button
          v-show="currentPage > 1"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-small"
          icon-right="chevron-left"
          @click="$_goToPage(currentPage - 1)"
        ></b-button>
        <b-button
          v-show="currentPage < pageCount"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-small"
          icon-right="chevron-right"
          @click="$_goToPage(currentPage + 1)"
        ></b-button>
      </div>
    </div>
    <div
      v-if="currentAnswerGroup"
      class="sentence-container ha-vertical-layout-3"
    >
      <sentence-detail
        v-for="(sentence, index) in sentences"
        :key="sentence.sentence_id"
        :titleHandler="order => 'Câu hỏi ' + order"
        :order="$_getSentenceOrder(index)"
        :userAnswer="currentAnswerGroup.answers[index]"
        :showAnswer="showAnswer"
        :sentence="sentence"
        ref="sentences"
      />
    </div>
    <div v-else class="sentence-container ha-vertical-layout-3">
      <sentence-detail
        v-for="(sentence, index) in sentences"
        :key="sentence.sentence_id"
        :titleHandler="order => 'Câu hỏi ' + order"
        :order="$_getSentenceOrder(index)"
        :userAnswer="{
          sentence_id: sentence.sentence_id,
          user_answer: sentence.user_answer
        }"
        :showAnswer="true"
        :sentence="sentence"
        ref="sentences"
      />
    </div>
    <div class="is-flex is-justify-content-flex-end">
      <div class="buttons">
        <b-button
          v-show="currentPage > 1"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-small"
          icon-right="chevron-left"
          @click="$_goToPage(currentPage - 1)"
        ></b-button>
        <b-button
          v-show="currentPage < pageCount"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-small"
          icon-right="chevron-right"
          @click="$_goToPage(currentPage + 1)"
        ></b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import panelMixin from "./sentence-panel.mixin";

export default {
  name: "SentencePanel",
  components: {
    "sentence-detail": () => import("./sentence-detail")
  },
  mixins: [panelMixin("sentences")],
  inject: ["$_navigateToPage"],
  props: {
    sentences: Array,
    selectedOrder: Number,
    currentPage: Number,
    pageCount: Number,
    currentAnswerGroup: Object,
    sentencesPerGroup: Number,
    showAnswer: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    selectedOrder(val) {
      const index = val - 1 - (this.currentPage - 1) * this.sentencesPerGroup;
      this.$_scrollToSentence(index);
    }
  },
  computed: {},
  methods: {
    $_getSentenceOrder(index) {
      return this.sentencesPerGroup * (this.currentPage - 1) + index + 1;
    },
    $_goToPage(page) {
      this.$_navigateToPage(page).then(() => {
        this.$nextTick(() => {
          this.$_scrollToSentence(0);
        });
      });
    }
  }
};
</script>
