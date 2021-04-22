<template>
  <div id="admin-layout" class="is-flex is-flex-direction-column">
    <div id="admin-layout-content" class="is-flex h-100">
      <div id="admin-sidebar-container">
        <router-view name="sidebar" />
      </div>
      <div id="admin-main-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
  props: {
    navigations: {
      type: Array,
      default: () => []
    }
  },
  provide() {
    return {
      user: {
        username: "Minh"
      },
      navigations: this.navigations
    };
  }
};
</script>

<style scoped lang="scss">
#admin-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#admin-layout-content {
  margin-top: 0;
  height: 100%;

  #admin-sidebar-container {
    flex-grow: auto;
  }

  #admin-main-body {
    flex-grow: 1;
    margin-left: 1.5rem;
  }
}
</style>
