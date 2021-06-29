<template>
  <ValidationObserver tag="form" ref="validator" class="ha-vertical-layout-7">
    <div class="form-group-row-2">
      <validated-form-element name="alias" rules="required" label="Biệt danh">
        <b-input v-model="form.alias" />
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
import formMixin from "../form-group/form.mixin";

export default {
  name: "ManagerInfoForm",
  mixins: [formMixin],
  components: {
    ValidationObserver,
    ValidatedFormElement
  },
  mounted: function() {
    if (!this.data) {
      return;
    }
    this.form = {
      alias: this.data.alias
    };
  },
  watch: {
    data() {
      if (!this.data) {
        return;
      }
      this.form = {
        alias: this.data.alias
      };
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style.scss";
</style>
