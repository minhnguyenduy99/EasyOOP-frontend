<template>
  <div class="menu-dropdown-item">
    <menu-dropdown v-if="isMenu" :data="data" position="is-right" />
    <div v-else class="is-flex">
      <b-button
        class="is-flex-grow-1"
        type="is-primary-light"
        tag="router-link"
        :to="data.to"
        >{{ data.menu_name }}</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuDropdownItem",
  components: {
    "menu-dropdown": () => import("./menu-dropdown")
  },
  props: {
    data: {
      menu_id: String,
      menu_name: String,
      menu_type: String
    }
  },
  computed: {
    isMenu() {
      return this.data.menu_type === "menu";
    }
  }
};
</script>

<style scoped lang="scss">
.menu-dropdown {
  width: 100%;
}
</style>
