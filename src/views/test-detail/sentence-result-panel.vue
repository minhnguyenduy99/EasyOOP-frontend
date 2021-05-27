<template>
  <div class="sentence-panel">
    <div class="is-flex is-justify-content-flex-end">
      <div class="buttons">
        <b-button
          v-show="currentPage > 1"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-medium"
          icon-right="chevron-left"
          @click="$_navigateToPage(currentPage - 1)"
        ></b-button>
        <b-button
          v-show="currentPage < pageCount"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-medium"
          icon-right="chevron-right"
          @click="$_navigateToPage(currentPage + 1)"
        ></b-button>
      </div>
    </div>
    <div
      v-if="currentAnswerGroup"
      class="sentence-container ha-vertical-layout-3"
    >
      <div v-for="(sentence, index) in sentences" :key="sentence.sentence_id">
        <sentence-detail
          :titleHandler="order => 'Câu hỏi ' + order"
          :order="$_getSentenceOrder(index)"
          :userAnswer="currentAnswerGroup.answers[index]"
          :showAnswer="true"
          :sentence="sentence"
          ref="sentences"
        />
      </div>
    </div>
    <div class="is-flex is-justify-content-flex-end">
      <div class="buttons">
        <b-button
          v-show="currentPage > 1"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-medium"
          icon-right="chevron-left"
          @click="$_navigateToPage(currentPage - 1)"
        ></b-button>
        <b-button
          v-show="currentPage < pageCount"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-medium"
          icon-right="chevron-right"
          @click="$_navigateToPage(currentPage + 1)"
        ></b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import panelMixin from "./mixins/sentence-panel.mixin";

export default {
  name: "SentenceResultPanel",
  components: {
    "sentence-detail": () =>
      import("@/components/sentence-detail/sentence-detail")
  },
  mixins: [panelMixin("sentences")],
  inject: ["$_navigateToPage"],
  props: {
    sentences: Array,
    selectedOrder: Number
  },
  watch: {
    selectedOrder(val) {
      const index = val - 1 - (this.currentPage - 1) * this.sentencesPerGroup;
      this.$_scrollToSentence(index);
    }
  },
  computed: {
    ...mapGetters("VIEWER_TEST", [
      "currentAnswerGroup",
      "sentencesPerGroup",
      "currentPage",
      "pageCount"
    ])
  },
  methods: {
    $_getSentenceOrder(index) {
      return this.sentencesPerGroup * (this.currentPage - 1) + index + 1;
    }
  }
};
</script>
