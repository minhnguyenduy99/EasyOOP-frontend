<template>
  <div id="personal-layout">
    <header id="personal-layout-header">
      <router-view name="header" />
    </header>
    <div class="main-container">
      <div class="main-section ha-vertical-layout-5-mobile">
        <div id="personal-sidebar">
          <router-view name="personal-sidebar" />
        </div>
        <div>
          <router-view />
        </div>
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
  name: "PersonAccountLayout",
  props: {
    navigations: {
      type: Array,
      default: () => []
    },
    currentNavIndex: Number
  },
  provide() {
    return {
      user: this.user,
      navigations: this.navigations,
      currentNavIndex: () => this.currentNavIndex,
      $p_loadPage: this.loadPage.bind(this),
      $p_showLoginModal: this.showLoginModal.bind(this)
    };
  },
  data: () => ({
    isLoading: false
  }),
  computed: {
    ...mapGetters("AUTH", ["isAuthenticated", "user"])
  },
  methods: {
    loadPage(loading) {
      this.isLoading = loading;
    },
    showLoginModal() {
      this.showModal = true;
    }
  }
};
</script>

<style scoped lang="scss">
#personal-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#personal-layout-header {
  height: 82px;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
}

.main-container {
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.main-section {
  width: 80%;

  @include tablet {
    display: grid;
    grid-template-columns: min(250px) 1fr;
    column-gap: 1rem;
  }
}

#personal-sidebar {
  height: fit-content;

  @include tablet {
    position: sticky;
    top: 100px;
    left: 0;
  }
}
</style>
