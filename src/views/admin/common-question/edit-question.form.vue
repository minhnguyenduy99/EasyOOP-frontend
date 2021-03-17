<template>
  <div id="edit-question-form">
    <h1 class="is-size-4 has-text-weight-bold">Cập nhật câu hỏi</h1>
    <hr class="is-hr" />
    <ValidationObserver tag="form" ref="validator" class="ha-vertical-layout-5">
      <validated-form-element name="tag" rules="required" label="Nhãn dán">
        <b-taginput
          maxtags="1"
          icon="tag"
          :data="filteredTags"
          v-model="chosenTags"
          autocomplete
          type="is-primary-light"
          field="tag_value"
          @typing="$on_tagInputTyping"
          :create-tag="tag => tag.tag_value"
          :allow-new="false"
        />
      </validated-form-element>
      <validated-form-element
        name="question"
        rules="required|minmax:10,200"
        label="Câu hỏi"
        placeholder="Từ 10 đến 200 ký tự"
      >
        <b-input v-model="form.question" />
      </validated-form-element>
      <validated-form-element
        name="answer"
        rules="required|minmax:10,200"
        label="Câu trả lời"
        placeholder="Từ 10 đến 200 ký tự"
      >
        <b-input type="textarea" v-model="form.answer" />
      </validated-form-element>
      <hr class="is-hr" />
      <b-button
        type="is-primary is-dark"
        @click="$on_submitButtonClicked"
        class="w-100"
        >Cập nhật</b-button
      >
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";
import { ToastNotifier } from "../../../utils";

export default {
  name: "EditQuestionForm",
  components: {
    ValidationObserver,
    ValidatedFormElement
  },
  props: {
    question: Object
  },
  inject: ["$api_updateQuestion", "$api_findTags"],
  data: () => ({
    qaId: "",
    form: {
      question: "",
      answer: "",
      tag: ""
    },
    filteredTags: [],
    chosenTags: []
  }),
  computed: {
    validator() {
      return this.$refs["validator"];
    }
  },
  created: function() {
    const { qa_id, ...question } = this.question;
    this.form = question;
    this.qaId = qa_id;
    this.chosenTags = [{ tag_value: this.form.tag }];
  },
  methods: {
    async $on_submitButtonClicked() {
      const isValid = await this.validator.validate();
      if (!isValid) {
        return;
      }
      this.form.tag = this.chosenTags[0];
      console.log(this.form);
      this.$api_updateQuestion(this.qaId, this.form).then(result => {
        const { error } = result;
        if (error) {
          this.validator.setErrors({
            general: [error]
          });
          this.$emit("submitted", { data: null, success: false });
          return;
        }
        ToastNotifier.success(this.$buefy.toast, "Cập nhật câu hỏi thành công");
        this.$emit("submitted", { data: this.form, success: true });
      });
    },
    $on_tagInputTyping(value) {
      this.$api_findTags(value).then(result => {
        const { error, data } = result;
        this.filteredTags.length = 0;
        if (error) {
          return;
        }
        this.filteredTags.push(...data);
      });
    }
  }
};
</script>

<style scoped lang="scss">
#edit-question-form {
  @include tablet {
    width: 300px;
  }
}
</style>
