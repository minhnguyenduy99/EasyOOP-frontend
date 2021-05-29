<template>
  <div class="form-group">
    <div class="form-group-title">
      <span>{{ title }}</span>
      <hr class="is-hr" />
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { FormMixin } from "@/mixins";

export default {
  name: "FormGroup",
  mixins: [FormMixin("validator")],
  props: {
    title: String
  }
};
</script>

<style scoped lang="scss">
.form-group {
  &-title {
    font-weight: bold;
    color: $grey-light;

    hr {
      display: block;
      margin-bottom: 1rem;
    }
  }
}
</style>

<style scoped lang="scss">
@import "./form-group.scss";
</style>
