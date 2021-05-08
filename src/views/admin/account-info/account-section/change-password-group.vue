<template>
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
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";
import GroupMixin from "../group.mixin";

export default {
  name: "ChangePasswordGroup",
  components: {
    ValidationObserver,
    ValidatedFormElement
  },
  mixins: [GroupMixin],
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

<style scoped lang="scss">
@import "../style.scss";
</style>
