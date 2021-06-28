<template>
  <modal-form
    class="edit-tag-form"
    width="400px"
    :has-card="true"
    rounded
    title="THÔNG TIN NHÃN DÁN"
    type="is-primary-light"
  >
    <ValidationObserver
      tag="form"
      ref="validator"
      class="ha-vertical-layout-5"
      v-slot="{ failed }"
    >
      <validated-form-element name="tag_type" label="Loại nhãn dán">
        <b-input disabled :value="tag.tag_type" />
      </validated-form-element>
      <validated-form-element
        v-if="tag.tag_type === 'question'"
        name="used"
        label="Tình trạng sử dụng"
      >
        <b-input disabled :value="tag.used ? 'Đã sử dụng' : 'Chưa sử dụng'" />
      </validated-form-element>
      <validated-form-element
        name="tag_id"
        label="ID nhãn dán"
        rules="required"
      >
        <b-input :disabled="!isQuestionTag || tag.used" v-model="form.tag_id" />
      </validated-form-element>
      <validated-form-element
        name="tag_value"
        rules="required"
        label="Tiêu đề nhãn dán"
      >
        <b-input v-model="form.tag_value" />
      </validated-form-element>
      <hr />
      <div class="is-flex is-flex-direction-column ha-vertical-layout-7">
        <b-button
          class="is-primary"
          native-type="button"
          :disabled="failed"
          :loading="updateButtonLoading"
          @click="$on_updateTag"
          >CẬP NHẬT</b-button
        >
        <b-button
          v-if="isQuestionTag && !tag.used"
          class="is-danger"
          native-type="button"
          :loading="deleteButtonLoading"
          @click="$on_deleteTag"
          >XÓA</b-button
        >
      </div>
    </ValidationObserver>
  </modal-form>
</template>

<script>
import { mapActions } from "vuex";
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";
import { TAG_TYPES } from "@/utils";
import { DeleteTagMixin, UpdateTagMixin } from "./mixins";

export default {
  name: "EditTagForm",
  components: {
    ValidationObserver,
    ValidatedFormElement,
    "modal-form": () => import("@/components/modal-form.vue")
  },
  mixins: [UpdateTagMixin({ mapActions }), DeleteTagMixin({ mapActions })],
  props: {
    tag: Object
  },
  data: () => ({
    form: {
      tag_id: "",
      tag_value: ""
    },
    updateButtonLoading: false,
    deleteButtonLoading: false
  }),
  computed: {
    isQuestionTag() {
      return this.tag.tag_type === TAG_TYPES.QUESTION;
    },
    validator() {
      return this.$refs.validator;
    }
  },
  mounted: function() {
    const { tag_id, tag_value } = this.tag ?? {};
    this.form.tag_id = tag_id;
    this.form.tag_value = tag_value;
  },
  methods: {
    async $on_updateTag() {
      const isValid = await this.$refs.validator.validate();
      if (!isValid) {
        return;
      }
      this.updateButtonLoading = true;
      this.$m_updateTag(this.tag, this.form).then(result => {
        this.updateButtonLoading = false;
        const { error } = result;
        if (error) {
          this.validator.setErrors({
            tag_id: [this.$serverLocaler.getMessage(error.errorType)]
          });
          return;
        }
        this.$emit("tag-updated");
      });
    },
    $on_deleteTag() {
      this.deleteButtonLoading = true;
      this.$m_deleteTag(this.tag).then(result => {
        this.deleteButtonLoading = false;
        const { error } = result;
        if (error) {
          return;
        }
        this.$emit("tag-deleted");
      });
    }
  }
};
</script>
