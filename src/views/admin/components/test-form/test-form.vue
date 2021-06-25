<template>
  <div class="test-form">
    <ValidationObserver tag="form" ref="validator" class="ha-vertical-layout-7">
      <validated-form-element
        name="title"
        rules="required|minmax:10,50"
        label-position="inside"
        label="Tên bài test (từ 10 đến 50 ký tự)"
      >
        <b-input size="is-medium" v-model="formData.title" />
      </validated-form-element>
      <div
        class="input-group is-justify-content-space-between ha-vertical-layout-7"
      >
        <validated-form-element name="topic_id" rules="required" label="Chủ đề">
          <b-select
            class="is-fullwidth"
            placeholder="Chủ đề"
            v-model="formData.topic_id"
          >
            <option
              v-for="topic in topics"
              :key="topic.id"
              :value="topic.topic_id"
            >
              {{ topic.topic_title }}
            </option>
          </b-select>
        </validated-form-element>
        <validated-form-element
          name="default_score_per_sentence"
          rules="required|min_value:1"
          label="Số điểm mỗi câu"
        >
          <b-input
            class="is-fullwidth"
            v-model.number="formData.default_score_per_sentence"
          />
        </validated-form-element>
      </div>
      <div>
        <validated-form-element name="type" label="Loại bài test">
          <b-select
            class="is-fullwidth"
            placeholder="Loại bài test"
            v-model="formData.type"
          >
            <option
              v-for="type in TEST_TYPES_MAPPING"
              :key="type.id"
              :value="type.code"
            >
              {{ type.text }}
            </option>
          </b-select>
        </validated-form-element>
        <div v-if="isTimeLimited" class="input-group ha-vertical-layout-7">
          <validated-form-element
            name="limited_hour"
            label="giờ"
            rules="required"
          >
            <b-select v-model.number="limitedTime.hour" class="is-fullwidth">
              <option
                v-for="hour in TIME_OPTIONS.hours"
                :key="hour"
                :value="hour"
              >
                {{ hour }}
              </option>
            </b-select>
          </validated-form-element>
          <validated-form-element
            name="limited_minute"
            label="phút"
            rules="required"
          >
            <b-select v-model.number="limitedTime.minute" class="is-fullwidth">
              <option
                v-for="minute in TIME_OPTIONS.minutes"
                :key="minute"
                :value="minute"
              >
                {{ minute }}
              </option>
            </b-select>
          </validated-form-element>
        </div>
      </div>
    </ValidationObserver>
    <div class="card">
      <div class="card-content test-info ha-vertical-layout-6">
        <div class="test-info-group">
          <h5>Số lượng câu hỏi</h5>
          <b-tag size="is-medium" type="is-primary-dark">
            {{ numberOfSentences }}
          </b-tag>
          <h5>Số điểm tối đa</h5>
          <b-tag size="is-medium" type="is-primary-dark">
            {{ totalScore }}
          </b-tag>
        </div>
        <b-button
          type="is-primary"
          class="form-button has-text-weight-bold"
          @click="$on_submitted"
          :disabled="!submittable"
          >{{ submitButtonTitle }}</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";
import TestFormMixin from "./test-form.mixin";
import { generateTime } from "@/utils";
import FindTopicsMixin from "./mixins/findTopics.mixin";

export default {
  name: "TestForm",
  components: {
    ValidationObserver,
    ValidatedFormElement
  },
  mixins: [TestFormMixin, FindTopicsMixin],
  props: {
    submitButtonTitle: String,
    sentences: Array,
    formValid: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    TEST_TYPES_MAPPING: [
      {
        code: 1,
        text: "Giới hạn thời gian"
      },
      {
        code: 2,
        text: "Không giới hạn thời gian"
      }
    ],
    TIME_OPTIONS: {
      hours: [],
      minutes: []
    }
  }),
  computed: {
    validator() {
      return this.$refs.validator;
    },
    submittable() {
      return this.formValid;
    },
    numberOfSentences() {
      return this.sentences.length;
    },
    totalScore() {
      return this.sentences.reduce(
        (pre, cur) =>
          pre +
          (cur.score === 0
            ? this.formData.default_score_per_sentence
            : cur.score),
        0
      );
    }
  },
  mounted: function() {
    this.TIME_OPTIONS = generateTime();
    this.$_requestTopics();
  },
  methods: {
    async $validateForm() {
      const isFormValid = await this.validator.validate();
      if (!isFormValid) {
        return false;
      }
      const form = this.$_sanitizeForm();
      return form;
    },

    $_sanitizeForm() {
      const { type } = this.formData;
      if (type === this.TEST_TYPES.LIMITED_TIME) {
        this.formData.limited_time = this.limitedTimeInSeconds;
      }
      this.formData.sentences = this.sentences;
      return { ...this.formData };
    }
  }
};
</script>

<style scoped lang="scss">
.test-form {
  display: grid;
  row-gap: 1rem;

  @include tablet {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
}

.test-form-limited-time {
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 0.5rem;

  &-options {
    display: flex;

    > *:first-child {
      margin-right: 0.5rem;
    }
  }
}

.test-info {
  &-group {
    display: grid;
    grid-template-columns: 1fr 70px;
    row-gap: 1rem;
    align-items: center;

    h5 {
      font-weight: bold;
      color: $grey;
      margin-right: 1rem;
    }

    .tag {
      font-weight: bold;
    }
  }
}

.form-button {
  width: 100%;

  @include tablet {
    width: fit-content;
  }
}
</style>
