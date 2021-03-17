<template>
  <div id="create-question-form">
    <h1 class="is-size-4 has-text-weight-bold">Tạo câu hỏi</h1>
    <hr class="is-hr" />
    <ValidationObserver tag="form" ref="validator" class="ha-vertical-layout-5">
      <validated-form-element name="tags" rules="required" label="Nhãn dán">
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
        class="is-fullwidth"
        >Tạo</b-button
      >
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";
import { ToastNotifier } from "../../../utils";

export default {
  name: "CreateQuestionForm",
  components: {
    ValidationObserver,
    ValidatedFormElement
  },
  inject: ["$api_createQuestion", "$api_findTags"],
  data: () => ({
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
  methods: {
    async $on_submitButtonClicked() {
      const isValid = await this.validator.validate();
      if (!isValid) {
        return;
      }
      this.form.tag = this.chosenTags[0];
      this.$api_createQuestion(this.form).then(result => {
        const { error } = result;
        if (error) {
          this.validator.setErrors({
            general: [error]
          });
          this.$emit("submitted", { data: null, success: false });
          return;
        }
        ToastNotifier.success(this.$buefy.toast, "Tạo câu hỏi thành công");
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

<style scoped>
#create-question-form {
  width: 300px;
}
</style>
