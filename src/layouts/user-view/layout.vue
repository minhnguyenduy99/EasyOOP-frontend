<template>
  <div id="user-view-layout">
    <!-- Hero -->
    <header id="user-view-header">
      <router-view name="header" />
    </header>
    <!-- <section
      class="hero is-primary-light is-fullheight-with-navbar"
      v-if="includeHero"
    >
      <div class="hero-body">
        <user-view-hero-body />
      </div>
    </section> -->
    <!-- <section v-else>
      <div style="height: 20px"></div>
    </section> -->
    <section
      :class="{
        'is-page-responsive': !paddingless
      }"
    >
      <router-view name="default" />
    </section>
    <router-view v-if="footer" name="footer" />
    <b-loading is-full-page v-model="isLoading" :can-cancel="false">
      <b-icon
        pack="fas"
        icon="sync-alt"
        size="is-large"
        custom-class="fa-spin"
      />
    </b-loading>
    <b-modal v-model="showModal" has-modal-card>
      <login-form
        id="login-form"
        @logined="$on_logined"
        :submitHandler="loginWithPassword"
      />
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { computed } from "@vue/composition-api";
import { ToastNotifier } from "@/utils";

export default {
  name: "UserViewLayout",
  components: {
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
    footer: Boolean,
    headerTransition: {
      type: Boolean,
      default: () => false
    },
    paddingless: Boolean
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
    ...mapActions("AUTH", ["loginWithPassword"]),

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

    async $on_logined(success) {
      if (success) {
        this.showModal = false;
        ToastNotifier.success(this.$buefy.toast, "Đăng nhập thành công");
        return;
      }
    }
  }
};
</script>

<style scoped lang="scss">
$navbar-height: 82px;

#user-view-header {
  padding: 0;
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
  }
}

#user-view-main-body {
  padding: 0 $page-padding-horizontal-small;

  @include tablet {
    padding: 0 $page-padding-horizontal-medium;
  }
}

#login-form {
  width: 400px;
}
</style>
