<template>
  <modal-form
    id="edit-question-form"
    :has-card="true"
    rounded
    title="Cập nhật câu hỏi"
    headerClass="has-background-primary-light has-text-white"
  >
    <ValidationObserver tag="form" ref="validator" class="ha-vertical-layout-5">
      <validated-form-element name="tags" rules="required" label="Nhãn dán">
        <b-taginput
          maxtags="1"
          icon="tag"
          :data="filteredTags"
          v-model="chosenTags"
          autocomplete
          type="is-primary-light"
          field="tag_id"
          @typing="$on_tagInputTyping"
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
        >Cập nhật</b-button
      >
    </ValidationObserver>
  </modal-form>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement, ModalForm } from "@/components";
import { ToastNotifier } from "@/utils";
import { mapActions } from "vuex";

export default {
  name: "EditQuestionForm",
  components: {
    ValidationObserver,
    ValidatedFormElement,
    ModalForm
  },
  props: {
    question: Object
  },
  data: () => ({
    qaId: "",
    form: {
      question: "",
      answer: "",
      tag_id: ""
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
    const { tag_id } = question;
    this.form = question;
    this.qaId = qa_id;
    if (!tag_id) {
      return;
    }
    this.chosenTags = [tag_id];
  },
  methods: {
    ...mapActions("QANDA", ["updateQuestion", "getUnusedQuestionTags"]),

    async $on_submitButtonClicked() {
      const isValid = await this.validator.validate();
      if (!isValid) {
        return;
      }
      this.form.tag_id = this.chosenTags[0];
      const form = {
        qa_id: this.qaId,
        ...this.form
      };
      this.updateQuestion(form).then(result => {
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
      this.getUnusedQuestionTags({ search: value }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.filteredTags.length = 0;
        const { results } = data;
        this.filteredTags.push(...results);
      });
    }
  }
};
</script>

<style scoped lang="scss">
#edit-question-form {
  @include tablet {
    width: 500px;
  }
}
</style>
