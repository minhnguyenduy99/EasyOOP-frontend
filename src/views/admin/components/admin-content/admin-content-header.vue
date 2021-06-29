<template>
  <div class="admin-header card">
    <div class="admin-header-content card-content">
      <div class="admin-header-content--title">
        <h1 class="mr-3 is-size-4">{{ title }}</h1>
        <slot name="action"></slot>
      </div>
      <div class="admin-header-content--icon">
        <b-icon
          type="is-primary-dark"
          :pack="iconPack"
          :icon="icon"
          size="is-large"
        ></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
import AdminContentHeaderMixin from "./admin-content-header.mixin";

export default {
  name: "AdminHeader",
  mixins: [AdminContentHeaderMixin]
};
</script>

<style scoped lang="scss">
$header-background: rgb(245, 245, 245);
.admin-header.card {
  background: $header-background;

  .admin-header-content {
    padding: 1rem;

    &--title {
      > h1 {
        margin-bottom: 0.5rem;
      }
    }

    &--icon {
      display: none;
    }
  }

  @include tablet {
    .admin-header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &--title {
        display: flex;
        align-items: flex-end;
        > h1 {
          margin-bottom: 0;
        }
      }

      &--icon {
        display: block;
      }
    }
  }
}
</style>
