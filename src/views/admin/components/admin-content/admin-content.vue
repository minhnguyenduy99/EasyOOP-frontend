<template>
  <div class="admin-content">
    <slot name="header">
      <admin-content-header :title="title" :icon="icon" :iconPack="iconPack" />
    </slot>
    <div :class="[contentClass ? contentClass : 'admin-content-body']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import AdminContentHeader from "./admin-content-header";
import AdminContentHeaderMixin from "./admin-content-header.mixin";

export default {
  components: {
    AdminContentHeader
  },
  mixins: [AdminContentHeaderMixin],
  props: {
    contentClass: String
  }
};
</script>

<style scoped lang="scss">
$admin-content-background-color: rgb(250, 250, 250);
.admin-content {
  background: $admin-content-background-color;

  &-body {
    padding: 1rem 0.75rem;
  }
}
</style>
