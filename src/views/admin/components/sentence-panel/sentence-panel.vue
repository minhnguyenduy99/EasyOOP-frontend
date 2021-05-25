<template>
  <div class="sentence-panel ha-vertical-layout-5">
    <div v-if="sentences.length > 0" class="sentence-panel-action">
      <hr />
      <b-button
        class="has-text-weight-bold"
        type="is-primary-light"
        @click="$_addSentence(-1)"
        >Thêm câu hỏi</b-button
      >
      <hr />
    </div>
    <div class="sentence-panel-container ha-vertical-layout-7">
      <slot
        v-bind="{ sentences, add: $_addSentence, remove: $_removeSentence }"
      >
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
            <div class="is-flex">
              <b-button
                type="is-primary"
                icon-right="plus"
                class="is-icon-button mr-2"
                size="is-small"
                @click="$_addSentence(index)"
              />
              <b-button
                type="is-danger"
                icon-right="minus"
                class="is-icon-button mr-2"
                size="is-small"
                @click="$_removeSentence(index)"
              />
              <b-button
                icon-right="copy"
                class="is-icon-button"
                size="is-small"
                @click="$_copySentence(index)"
              />
            </div>
          </template>
        </test-sentence-editable>
      </slot>
    </div>
    <div class="sentence-panel-action">
      <hr />
      <b-button
        class="has-text-weight-bold"
        type="is-primary-light"
        @click="$_addSentence()"
        >Thêm câu hỏi</b-button
      >
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  name: "SentencePanel",
  components: {
    "test-sentence-editable": () =>
      import("../test-sentence/test-sentence-editable")
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    sentences: [],
    valids: []
  }),
  mounted: function() {
    this.$_updateSentences();
  },
  watch: {
    data(val) {
      this.$_updateSentences();
    }
  },
  methods: {
    $_addSentence(index = null) {
      index = index ?? this.sentences.length - 1;
      const sentence = {
        options: [],
        question: "",
        answer: -1,
        score: 0
      };
      this.sentences.splice(index + 1, 0, sentence);
      this.valids.splice(index + 1, 0, false);
      this.$emit("added", { sentences: this.sentences, sentence });
    },
    $_removeSentence(index = -1) {
      this.$delete(this.sentences, index);
      const [removedSentence] = this.valids.splice(index, 1);
      this.$emit("removed", {
        sentences: this.sentences,
        removed: removedSentence
      });
    },
    $_copySentence(index) {
      const newSentence = {
        ...this.sentences[index],
        options: [...this.sentences[index].options]
      };
      this.sentences.splice(index + 1, 0, newSentence);
      this.valids.splice(index + 1, 0, this.valids[index]);
      this.$emit("added", { sentences: this.sentences, sentence: newSentence });
    },
    $_areSentencesValid() {
      return this.valids.indexOf(false) === -1 ? true : false;
    },
    $on_sentenceValidatedChanged(index, valid) {
      this.valids[index] = valid;
      this.$emit("validated", this.$_areSentencesValid());
    },
    $_updateSentences() {
      this.sentences.length = 0;
      this.sentences = [...this.data];
      this.valids = this.sentences.map(() => true);
    }
  }
};
</script>

<style scoped lang="scss">
.sentence-panel-action {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  column-gap: 1rem;
  align-items: center;

  hr {
    background: rgb(230, 230, 230);
    margin: 0;
    padding: 0;
  }
}
</style>
