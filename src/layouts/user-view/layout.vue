<template>
  <div id="user-view-layout">
    <!-- Hero -->
    <header id="user-view-header">
      <router-view name="header" />
    </header>
    <section
      class="hero is-primary-light is-fullheight-with-navbar"
      v-if="includeHero"
    >
      <div class="hero-body">
        <user-view-hero-body />
      </div>
    </section>
    <section v-else>
      <div style="height: 20px"></div>
    </section>
    <div class="pt-4 ha-vertical-layout-5">
      <!-- Menu bar  -->
      <router-view name="menu-navbar" />

      <!-- Main body  -->
      <section id="main-body-section">
        <div id="body-section">
          <router-view name="default" />
        </div>
      </section>
      <footer id="user-view-footer" class="hero is-medium is-primary-light">
        <div class="hero-body">
          <router-view name="footer" />
        </div>
      </footer>
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
import { mapActions } from "vuex";
import UserViewHeroBody from "./user-view.hero";

export default {
  name: "UserViewLayout",
  components: {
    UserViewHeroBody
  },
  provide() {
    return {
      $p_loadPage: this.loadPage.bind(this)
    };
  },
  props: {
    includeHero: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data: () => ({
    isLoading: false
  }),
  methods: {
    ...mapActions("POST", ["getPostsByTopic"]),
    loadPage(loading) {
      this.isLoading = loading;
    }
  }
};
</script>

<style scoped lang="scss">
#user-view-header {
  padding: 0;
  height: $navbar-height;

  @include tablet {
    padding: 1rem;
  }
}

#main-body-section {
  padding: 0.5rem;

  @include tablet {
    padding: 0 1rem;
  }
}

#main-body-layout {
  #navbar-section {
    display: none;
  }

  @include desktop {
    display: flex;
    justify-content: space-between;
    position: relative;

    #navbar-section {
      display: block;
      position: sticky;
      top: 0;
      flex-basis: 20%;
      height: 90vh;
      overflow-y: auto;
    }

    #body-section {
      flex-basis: 78%;
    }
  }
}

#user-view-footer {
  margin-top: 2rem;
}
</style>
