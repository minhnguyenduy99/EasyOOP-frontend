<template>
  <div class="menu-dropdown-content is-flex">
    <menu-dropdown
      position="is-bottom-right"
      v-for="menu in childrenMenu"
      :key="menu.id"
      :data="menu"
    />
  </div>
</template>

<script>
export default {
  name: "MenuDropdownContent",
  components: {
    "menu-dropdown": () => import("./menu-dropdown")
  },
  provide() {
    return {
      findMenu: this.findMenu
    };
  },
  props: {
    childrenMenu: Array,
    findMenu: {
      type: Function,
      required: false,
      default: () => menuId => Promise.resolve([])
    }
  }
};
</script>

<style scoped lang="scss">
.menu-dropdown-content {
  > * {
    &:not(:last-child) {
      margin-right: 1.5rem;
    }
  }
}
</style>
