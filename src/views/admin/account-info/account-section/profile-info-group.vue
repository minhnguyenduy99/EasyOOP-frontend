<template>
  <ValidationObserver
    tag="form"
    ref="validator"
    class="ha-vertical-layout-7 ha-vertical-layout-5-mobile"
  >
    <div class="form-group-row">
      <validated-form-element name="first_name" rules="required" label="Họ">
        <b-input v-model="form.first_name" />
      </validated-form-element>
      <validated-form-element name="last_name" rules="required" label="Tên">
        <b-input v-model="form.last_name" />
      </validated-form-element>
      <validated-form-element
        name="display_name"
        rules="required"
        label="Tên hiển thị"
      >
        <b-input v-model="form.display_name" />
      </validated-form-element>
    </div>
    <b-button
      type="is-primary"
      @click="$on_submittedForm"
      :disabled="!isDataChanged"
    >
      <span class="has-text-weight-bold">Lưu</span>
    </b-button>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";
import GroupMixin from "../group.mixin";

export default {
  name: "ProfileInfoGroup",
  components: {
    ValidationObserver,
    ValidatedFormElement
  },
  mixins: [GroupMixin],
  data: () => ({
    form: {
      first_name: "",
      last_name: "",
      display_name: ""
    }
  }),
  mounted: function() {
    const { first_name, last_name, display_name } = this.data;
    this.form = {
      first_name,
      last_name,
      display_name
    };
  }
};
</script>

<style scoped lang="scss">
@import "../style.scss";
</style>
