<template>
  <div
    :class="['modal-form', hasCard ? 'card' : '', rounded ? 'is-rounded' : '']"
  >
    <div class="card-header">
      <slot name="header">
        <div :class="['card-header-title', headerClass]">
          <span>{{ title }}</span>
        </div>
      </slot>
    </div>
    <div :class="['card-content', contentClass]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalForm",
  props: {
    title: String,
    hasCard: {
      type: Boolean,
      default: () => false
    },
    rounded: {
      type: Boolean,
      default: () => true
    },
    headerClass: String,
    contentClass: String
  }
};
</script>

<style scoped lang="scss">
.modal-form {
  &.is-rounded {
    border-radius: 10px;
  }
}
</style>
