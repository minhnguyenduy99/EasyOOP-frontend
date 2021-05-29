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
    <!-- <section v-else>
      <div style="height: 20px"></div>
    </section> -->
    <div class="py-4 ha-vertical-layout-5">
      <!-- Menu bar  -->
      <router-view v-if="menuBar" name="menu-navbar" />

      <!-- Main body  -->
      <section id="main-body-section">
        <div id="body-section">
          <router-view name="default" />
        </div>
      </section>
      <footer
        v-if="footer"
        id="user-view-footer"
        class="hero is-medium is-primary-light"
      >
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
    <b-modal v-model="showModal" has-modal-card>
      <div class="card">
        <login-form
          class="card-content"
          @logined="$on_logined"
          fail-text="Đăng nhập thất bại"
          success-text="Đăng nhập thành công"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { computed } from "@vue/composition-api";
import UserViewHeroBody from "./user-view.hero";

export default {
  name: "UserViewLayout",
  components: {
    UserViewHeroBody,
    "login-form": () => import("@/components/login-form/login-form")
  },
  provide() {
    return {
      $p_loadPage: this.loadPage.bind(this),
      $p_showLoginModal: this.showLoginModal.bind(this),
      headerTransition: computed(() => this.headerTransition)
    };
  },
  props: {
    includeHero: {
      type: Boolean,
      required: false,
      default: () => false
    },
    menuBar: Boolean,
    footer: Boolean,
    headerTransition: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    isLoading: false,
    showModal: false
  }),
  computed: {
    ...mapGetters("AUTH", ["isAuthenticated"])
  },
  methods: {
    ...mapActions("POST", ["getPostsByTopic"]),

    loadPage(loading) {
      this.isLoading = loading;
    },
    showLoginModal() {
      this.showModal = true;
    },

    $on_formSubmitted(result) {
      const { success } = result;
      if (!success) {
        return;
      }
      this.showModal = false;
    },

    $on_logined() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped lang="scss">
$navbar-height: 82px;

#user-view-header {
  padding: 0;
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
