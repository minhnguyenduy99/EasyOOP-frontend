<template>
  <div class="admin-content ha-vertical-layout-5">
    <slot name="header">
      <admin-content-header :title="title" :icon="icon" :iconPack="iconPack" />
    </slot>
    <div class="px-4 py-3">
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
  mixins: [AdminContentHeaderMixin]
};
</script>

<style scoped lang="scss">
$admin-content-background-color: rgb(250, 250, 250);
.admin-content {
  background: $admin-content-background-color;
}
</style>
