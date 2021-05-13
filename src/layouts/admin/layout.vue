<template>
  <div
    v-if="isAuthenticated"
    id="admin-layout"
    class="is-flex is-flex-direction-column"
  >
    <div id="admin-layout-content">
      <div id="admin-sidebar-container">
        <router-view name="sidebar" />
      </div>
      <div id="admin-main-body">
        <router-view />
      </div>
    </div>
    <b-loading is-full-page v-model="isLoading" :can-cancel="false">
      <b-icon
        pack="fas"
        icon="sync-alt"
        size="is-large"
        custom-class="fa-spin"
      />
    </b-loading>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
      navigations: this.navigations,
      $p_loadPage: this.loadPage.bind(this)
    };
  },
  data: () => ({
    isLoading: false
  }),
  computed: {
    ...mapGetters("AUTH", ["isAuthenticated"])
  },
  methods: {
    loadPage(loading) {
      this.isLoading = loading;
    }
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
  display: flex;

  #admin-sidebar-container {
    flex-grow: auto;
  }

  #admin-main-body {
    flex-grow: 1;
    margin-left: 1.5rem;
  }
}
</style>
