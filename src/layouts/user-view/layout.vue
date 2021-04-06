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
        <div id="main-body-layout">
          <div id="navbar-section">
            <router-view name="sidebar" />
          </div>
          <div id="body-section">
            <router-view name="default" />
          </div>
        </div>
      </section>
      <footer id="user-view-footer" class="hero is-medium is-primary-light">
        <div class="hero-body">
          <router-view name="footer" />
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import UserViewHeroBody from "./user-view.hero";

export default {
  name: "UserViewLayout",
  components: {
    UserViewHeroBody
  },
  provide() {
    return {
      $api_getPostsGroupedByTopics: this.$api.posts.getPostGroupedByTopics
    };
  },
  props: {
    includeHero: {
      type: Boolean,
      required: false,
      default: () => false
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
