<template>
  <modal-form
    id="create-question-form"
    width="500px"
    :has-card="true"
    rounded
    title="Tạo câu hỏi"
    headerClass="has-background-primary-light has-text-white"
  >
    <ValidationObserver tag="form" ref="validator" class="ha-vertical-layout-5">
      <validated-form-element name="tags" rules="required" label="Nhãn dán">
        <b-taginput
          maxtags="1"
          icon="tag"
          :data="searchTags"
          v-model="chosenTags"
          autocomplete
          type="is-primary-dark"
          field="tag_id"
          @typing="$_requestUnusedTags"
          :create-tag="tag => tag.tag_id"
          :allow-new="false"
        >
          <template #default="{ option }">
            <div>
              <span class="has-text-weight-bold">{{ option.tag_value }} </span>
              <span class="ml-1">({{ option.tag_id }})</span>
            </div>
          </template>
        </b-taginput>
      </validated-form-element>
      <validated-form-element name="question" rules="required" label="Câu hỏi">
        <b-input v-model="form.question" />
      </validated-form-element>
      <validated-form-element
        name="answer"
        rules="required"
        label="Câu trả lời"
      >
        <b-input type="textarea" v-model="form.answer" />
      </validated-form-element>
      <hr class="is-hr" />
      <b-button
        type="is-primary is-dark"
        @click="$on_submitButtonClicked"
        class="is-fullwidth"
        >TẠO</b-button
      >
    </ValidationObserver>
  </modal-form>
</template>

<script>
import { mapActions } from "vuex";
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement, ModalForm } from "@/components";
import { ToastNotifier, FunctionDelayer } from "../../../utils";
import { FindTagsMixin } from "./mixins";

export default {
  name: "CreateQuestionForm",
  components: {
    ValidationObserver,
    ValidatedFormElement,
    ModalForm
  },
  mixins: [FindTagsMixin({ mapActions })],
  data: () => ({
    form: {
      question: "",
      answer: "",
      tag_id: ""
    },
    chosenTags: [],
    tagHandler: new FunctionDelayer()
  }),
  computed: {
    validator() {
      return this.$refs["validator"];
    }
  },
  methods: {
    ...mapActions("QANDA", ["createQuestion"]),

    async $on_submitButtonClicked() {
      const isValid = await this.validator.validate();
      if (!isValid) {
        return;
      }
      this.form.tag_id = this.chosenTags[0];
      this.createQuestion(this.form).then(result => {
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
    }
  }
};
</script>

<style scoped>
#create-question-form {
  width: 500px;
}
</style>
