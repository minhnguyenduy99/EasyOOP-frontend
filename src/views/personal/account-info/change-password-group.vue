<template>
  <form-group v-bind="$props">
    <ValidationObserver tag="form" ref="validator" class="ha-vertical-layout-7">
      <div class="form-group-row-2">
        <validated-form-element
          name="password"
          rules="required|minmax:10,20"
          label="Mật khẩu mới"
        >
          <b-input type="password" password-reveal v-model="form.password" />
        </validated-form-element>
      </div>
      <b-button
        type="is-primary"
        @click="$on_submittedForm"
        :disabled="!isDataChanged"
      >
        <span class="has-text-weight-bold">Thay đổi</span>
      </b-button>
    </ValidationObserver>
  </form-group>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";
import FormGroup from "../components/form-group/form-group.vue";

export default {
  name: "ChangePasswordGroup",
  extends: FormGroup,
  components: {
    ValidationObserver,
    ValidatedFormElement,
    FormGroup
  },
  mounted: function() {
    this.form = {
      password: ""
    };
  },
  watch: {
    data(val) {
      this.form.password = val?.password ?? "";
    }
  }
};
</script>
