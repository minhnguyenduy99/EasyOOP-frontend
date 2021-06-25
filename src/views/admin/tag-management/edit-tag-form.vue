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
        <b-input disabled v-model="form.tag_type" />
      </validated-form-element>
      <validated-form-element name="tag_id" label="ID nhãn dán">
        <b-input disabled v-model="form.tag_id" />
      </validated-form-element>
      <validated-form-element
        name="tag_value"
        rules="required"
        label="Tiêu đề nhãn dán"
      >
        <b-input v-model="form.tag_value" />
      </validated-form-element>
      <hr />
      <div class="is-flex is-flex-direction-column">
        <b-button
          class="is-primary"
          native-type="button"
          :disabled="failed"
          @click="$on_formSubmitted"
          >CẬP NHẬT</b-button
        >
      </div>
    </ValidationObserver>
  </modal-form>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";

export default {
  name: "EditTagForm",
  components: {
    ValidationObserver,
    ValidatedFormElement,
    "modal-form": () => import("@/components/modal-form.vue")
  },
  props: {
    tag: Object
  },
  data: () => ({
    form: {
      tag_type: "",
      tag_id: "",
      tag_value: ""
    }
  }),
  mounted: function() {
    const { tag_id, tag_value, tag_type } = this.tag ?? {};
    this.form.tag_type = tag_type;
    this.form.tag_id = tag_id;
    this.form.tag_value = tag_value;
  },
  methods: {
    async $on_formSubmitted() {
      const isValid = await this.$refs.validator.validate();
      if (!isValid) {
        this.$emit("submit", { success: false });
        return;
      }
      this.$emit("submit", { success: true, data: this.form });
    }
  }
};
</script>
