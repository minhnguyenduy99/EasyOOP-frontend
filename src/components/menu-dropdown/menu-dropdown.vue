<template>
  <div class="menu-dropdown">
    <menu-dropdown-item v-if="!isMenu" :data="data" />
    <b-dropdown
      v-else
      @active-change="$on_dropdownActive"
      :close-on-click="false"
      :class="[position]"
      style="width: 100%"
    >
      <template #trigger>
        <div
          class="dropdown-trigger is-flex is-justify-content-space-between is-align-items-center is-clickable"
        >
          <span class="has-text-weight-bold">{{ data.menu_name }}</span>
          <b-icon :icon="_triggerIcon" />
        </div>
      </template>
      <div>
        <b-dropdown-item
          v-for="item in childrenMenu"
          :key="item.id"
          :custom="true"
        >
          <menu-dropdown-item :data="item" />
        </b-dropdown-item>
      </div>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "MenuDropdown",
  components: {
    "menu-dropdown-item": () => import("./menu-dropdown-item")
  },
  inject: ["findMenu"],
  props: {
    position: {
      type: String,
      required: false,
      default: () => "is-bottom-right"
    },
    data: {
      menu_id: String,
      menu_name: String,
      menu_type: String
    }
  },
  data: () => ({
    childrenMenu: []
  }),
  computed: {
    isMenu() {
      return this.data.menu_type === "menu";
    },
    _triggerIcon() {
      if (!this.isMenu) {
        return "";
      }
      switch (this.position) {
        case "is-right":
          return "chevron-right";
      }
      return "chevron-down";
    }
  },
  methods: {
    $on_dropdownActive(active) {
      if (!active || !this.isMenu) {
        return;
      }
      console.log(this.data);
      this.findMenu(this.data.menu_id).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.childrenMenu.length = 0;
        this.childrenMenu.push(...data.children_menu);
        this.$nextTick();
      });
    }
  }
};
</script>

<style scoped lang="scss">
.dropdown-trigger {
  padding: 0.5rem 0;
  border: 2px solid transparent;
  transition: 0.1s;

  > span {
    transition: 0.3s;
  }

  &:hover {
    border-bottom: 2px solid $primary-light;
    > span {
      color: $primary-light;
    }
  }
}
</style>
