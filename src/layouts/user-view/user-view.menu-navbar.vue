<template>
  <div id="user-view-menu-navbar">
    <b-navbar>
      <template #start>
        <b-navbar-item id="menu-container" tag="div">
          <menu-dropdown-content
            :children-menu="rootMenus"
            :find-menu="$api.menus.getMenu"
          />
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item id="menu-container" tag="div">
          <b-input type="is-primary" icon-right="search" />
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import { MenuDropdownContent } from "@/components";

export default {
  name: "UserViewMenuNavbar",
  components: {
    MenuDropdownContent
  },
  data: () => ({
    rootMenus: []
  }),
  created: function() {
    this.$api.menus.getMenu().then(result => {
      const { error, data } = result;
      if (error) {
        return;
      }
      this.rootMenus.push(...data.children_menu);
    });
  }
};
</script>
