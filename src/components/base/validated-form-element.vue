<template>
  <div class="validated-form-element">
    <ValidationProvider
      :name="$attrs.name"
      :rules="$attrs.rules"
      v-slot="{ errors, valid }"
    >
      <b-field
        :label-position="$attrs['label-position']"
        :horizontal="$attrs.horizontal"
        :label="$attrs.label"
        :custom-class="$attrs['custom-class']"
        :class="['animated', 'faster', valid ? '' : 'headShake']"
        :message="errors[0]"
        :type="{
          'is-primary': showValidateIcon && !errors && valid,
          'is-danger': showValidateIcon && errors[0],
          'is-success': showValidateIcon && valid
        }"
      >
        <slot></slot>
        <p
          slot="message"
          :class="['help', 'is-danger', $attrs['message-class']]"
        >
          {{ errors[0] }}
        </p>
      </b-field>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "ValidatedFormElement",
  inheritAttrs: false,
  props: {
    showValidateIcon: {
      type: Boolean,
      default: () => true
    }
  },
  components: {
    ValidationProvider
  }
};
</script>

<style scoped lang="scss">
span.has-error {
  color: red;
}

.field-label-nowrap {
  label {
    white-space: nowrap;
  }
}
</style>
