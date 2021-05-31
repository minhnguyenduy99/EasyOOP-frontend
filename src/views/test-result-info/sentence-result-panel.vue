<template>
  <div class="sentence-panel">
    <div class="is-flex is-justify-content-flex-end">
      <div class="buttons">
        <b-button
          v-show="!isFirstPage"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-medium"
          icon-right="chevron-left"
          @click="$_navigateToPage(page - 1)"
        ></b-button>
        <b-button
          v-show="!isLastPage"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-medium"
          icon-right="chevron-right"
          @click="$_navigateToPage(page + 1)"
        ></b-button>
      </div>
    </div>
    <div class="sentence-container ha-vertical-layout-3">
      <div v-for="(sentence, index) in sentences" :key="sentence.sentence_id">
        <sentence-detail
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
    </div>
    <div class="is-flex is-justify-content-flex-end">
      <div class="buttons">
        <b-button
          v-show="!isFirstPage"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-medium"
          icon-right="chevron-left"
          @click="$_navigateToPage(page - 1)"
        ></b-button>
        <b-button
          v-show="!isLastPage"
          type="is-primary-light"
          outlined
          class="is-icon-button"
          size="is-medium"
          icon-right="chevron-right"
          @click="$_navigateToPage(page + 1)"
        ></b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SentenceResultPanel",
  components: {
    "sentence-detail": () =>
      import("@/components/sentence-detail/sentence-detail")
  },
  inject: ["$_navigateToPage", "SENTENCES_PER_PAGE"],
  props: {
    selectedOrder: Number,
    pageCount: Number,
    page: Number,
    sentences: Array
  },
  computed: {
    isLastPage() {
      return this.page === this.pageCount;
    },
    isFirstPage() {
      return this.page === 1;
    }
  },
  watch: {
    selectedOrder(val) {
      const index = val - 1 - (this.page - 1) * this.SENTENCES_PER_PAGE;
      console.log(index);
      this.$_scrollToSentence(index);
    }
  },
  methods: {
    $_getSentenceOrder(index) {
      return this.SENTENCES_PER_PAGE * (this.page - 1) + index + 1;
    },
    $_scrollToSentence(index) {
      // const index = order - 1 - (this.currentPage - 1) * this.sentencesPerGroup;
      const sentence = this.$refs.sentences[index].$el;
      sentence.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
};
</script>
