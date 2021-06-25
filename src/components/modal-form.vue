<template>
  <div
    :class="[
      'modal-form',
      hasCard ? 'card' : '',
      rounded ? 'is-rounded' : '',
      type
    ]"
    :style="{
      width
    }"
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
    width: {
      type: String,
      default: () => "100%"
    },
    type: {
      type: String,
      default: () => "is-primary-light",
      validator: val => ["is-primary-light"].indexOf(val) !== -1
    },
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
  margin: 0 auto;
  &.is-rounded {
    border-radius: 10px;
  }

  &.is-primary-light {
    .card-header-title {
      background: $primary-light;
      color: $white;
    }
  }
}
</style>
