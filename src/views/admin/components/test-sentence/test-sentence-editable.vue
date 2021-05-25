<template>
  <div
    :class="{
      'test-sentence-editable': true,
      '--top': isExpand,
      'py-3': isExpand
    }"
  >
    <slot name="active">
      <b-button
        :icon-right="isExpand ? expandIcon : closeIcon"
        class="is-icon-button is-transparent"
        size="is-medium"
        @click="isExpand = !isExpand"
      >
      </b-button>
    </slot>
    <div
      :class="{
        'sentence-header': true,
        '--error': hasErrors && !isExpand
      }"
    >
      <div v-if="isExpand">
        <b-field
          class="m-0"
          :label="questionLabel"
          label-position="on-border"
          type="is-primary-light"
        >
          <b-input size="is-medium" v-model.lazy="currentSentence.question" />
        </b-field>
        <b-collapse v-model="isExpand" animation="fade">
          <section class="expand-section">
            <div>
              <slot
                name="options"
                v-bind="{ options: currentSentence.options }"
              >
                <section class="py-5 ha-vertical-layout-7">
                  <div
                    class="sentence-option"
                    v-for="(option, index) in currentOptions"
                    :key="option.id"
                  >
                    <div class="is-flex py-2" v-if="option.edit">
                      <validated-form-element rules="required" name="option">
                        <b-input
                          v-if="option.edit"
                          class="mr-3"
                          v-model.lazy="option.value"
                          @keyup.enter.native="$on_optionInputEntered(index)"
                        />
                      </validated-form-element>
                      <b-button
                        type="is-primary"
                        @click="$_updateEditState(index, false)"
                        :disabled="!option.value"
                        >{{ saveOptionTitle }}</b-button
                      >
                    </div>
                    <div v-else class="sentence-option">
                      <b-radio
                        type="is-primary-light"
                        :native-value="index"
                        v-model="currentSentence.answer"
                      >
                        {{ option.value }}
                      </b-radio>
                      <div class="buttons px-3 sentence-option-action">
                        <b-button
                          class="is-icon-button"
                          icon-right="pen"
                          size="is-small"
                          type="is-primary"
                          @click="$_updateEditState(index, true)"
                        />
                        <b-button
                          class="is-icon-button"
                          icon-right="minus"
                          size="is-small"
                          type="is-danger"
                          @click="$_removeOption(index)"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </slot>
            </div>
            <section class="sentence-footer">
              <slot
                name="action"
                v-bind="{ add: $_addOption, remove: $_removeOption }"
              >
                <div class="sentence-actions">
                  <b-button
                    type="is-primary"
                    inverted
                    icon-left="plus"
                    @click="$_addOption('')"
                    >Thêm lựa chọn</b-button
                  >
                </div>
              </slot>
              <div class="sentence-inputs">
                <b-checkbox class="mr-3" v-model.lazy.number="setScore"
                  >Set điểm</b-checkbox
                >
                <validated-form-element
                  name="score"
                  class="sentence-inputs--score"
                >
                  <b-input
                    :disabled="!setScore"
                    v-model.number.lazy="currentSentence.score"
                    :placeholder="scoreInputPlaceholder"
                  />
                </validated-form-element>
              </div>
            </section>
          </section>
        </b-collapse>
      </div>
      <div v-else class="panel is-white">
        <div class="panel-heading">
          <div>
            <span class="is-size-7 has-text-grey">{{ questionLabel }}</span>
          </div>
          <div>
            <span class="has-text-weight-medium">{{
              currentSentence.question
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <slot name="add" />
  </div>
</template>

<script>
import { ValidatedFormElement } from "@/components";
import SentenceMixin from "./test-sentence.mixin";

export default {
  name: "TestSentenceEditable",
  components: {
    ValidatedFormElement
  },
  mixins: [SentenceMixin],
  props: {
    questionTitle: String,
    saveOptionTitle: String,
    scoreInputPlaceholder: String,
    closeIcon: {
      type: String,
      default: () => "chevron-circle-right"
    },
    expandIcon: {
      type: String,
      default: () => "chevron-circle-down"
    },
    order: Number,
    sentence: Object,
    expand: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    currentSentence: {
      question: "",
      answer: 0,
      options: [],
      score: 0
    },
    currentAnswer: -1,
    currentOptions: [],
    isExpand: true,
    setScore: false
  }),
  created: function() {
    if (!this.sentence) {
      return;
    }
    this.$_updateCurrentSentence();
    this.isExpand = this.expand;
  },
  watch: {
    hasErrors(val) {
      this.$emit("validated", !val);
    },
    sentence(val) {
      this.$_updateCurrentSentence();
    },
    setScore(val) {
      if (!val) {
        this.currentSentence.score = 0;
      }
    },
    currentAnswer(val) {
      this.currentSentence.answer = val;
    },
    sentenceOptions(val) {
      this.currentSentence.options = val;
    }
  },
  computed: {
    questionLabel() {
      return this.questionTitle + " " + (this.order + 1);
    },
    sentenceOptions() {
      return this.currentOptions
        .map(option => option.value)
        .filter(value => value !== "");
    },
    hasQuestion() {
      return this.currentSentence.question;
    },
    isOptionsEmpty() {
      return this.currentSentence.options.length === 0;
    },
    hasErrors() {
      return !this.hasQuestion || this.isOptionsEmpty;
    }
  },
  methods: {
    $_addOption(option) {
      this.currentOptions.push({
        edit: true,
        value: option
      });
    },
    $_removeOption(index) {
      this.currentOptions.splice(index, 1);
    },
    $_updateEditState(index, value) {
      this.currentOptions[index].edit = value;
    },
    $_updateCurrentSentence() {
      this.currentSentence = this.sentence;
      this.currentOptions = this.sentence.options.map(option => ({
        edit: false,
        value: option
      }));
      // this.currentAnswer = this.currentOptions[this.sentence.answer]?.value;
      this.currentAnswer = this.currentSentence.answer;
    },
    $on_optionInputEntered(index) {
      const optionValue = this.currentOptions[index].value;
      if (!optionValue) {
        this.$_removeOption(index);
        return;
      }
      this.$_updateEditState(index, false);
      this.$_addOption("");
    },
    $_isSentenceInfoValid() {
      const { question } = this.currentSentence;
      return question !== "" && !this.isOptionsEmpty;
    }
  }
};
</script>

<style scoped lang="scss">
.test-sentence-editable {
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 0.5rem;
  align-items: center;
  align-content: stretch;

  &.--top {
    align-items: flex-start;
  }
}

.sentence-header {
  box-sizing: border-box;
  &.--error {
    border: 1px solid $danger;
  }
}

.sentence-option {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-action {
    opacity: 0;
    display: flex;
    align-items: center;
  }

  &:hover {
    .sentence-option-action {
      opacity: 1;
    }
  }
}

.sentence-footer {
  display: flex;
  align-items: center;
}

.sentence-inputs {
  margin-left: 1rem;
  display: flex;
  align-items: center;

  &--score {
    width: 100px;
  }
}

.expand-button {
  background: transparent;
}
</style>
