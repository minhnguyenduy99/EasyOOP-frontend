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
export default {
  name: "FormGroup",
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
