<template>
  <div id="user-view-header-content">
    <transition
      name="custom-transition"
      mode="in-out"
      enter-active-class="animate__animated animate__slideInDown"
      leave-active-class="animate__animated animate__slideOutUp"
    >
      <b-navbar
        v-show="showNavbar"
        fixed-top
        :type="_themeType"
        transparent
        :shadow="!isScrollTop"
      >
        <template #brand>
          <b-navbar-item tag="router-link" to="/" class="is-align-self-center">
            <b-image
              id="website-icon"
              src="https://cdn4.iconfinder.com/data/icons/technology-83/1000/object_programming_development_oriented_developer_object-oriented_programming_software-512.png"
            />
          </b-navbar-item>
        </template>
        <template #end>
          <b-navbar-item tag="div" id="navigation-bar">
            <div class="navigate-button-group">
              <b-button
                class="navigate-button"
                type="is-primary-light"
                :outlined="!isScrollTop"
                tag="router-link"
                to="/"
                >Home</b-button
              >
              <b-button
                class="navigate-button"
                type="is-primary-light"
                :outlined="!isScrollTop"
                tag="router-link"
                to="/"
                >About</b-button
              >
              <b-button
                v-if="!isAuthenticated"
                class="navigate-button"
                type="is-primary-dark"
                @click="showLoginModal = true"
                >Login</b-button
              >
              <user-badge v-else :user="user" />
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </transition>
    <b-modal v-model="showLoginModal" has-modal-card>
      <div class="card">
        <login-form
          class="card-content"
          @logined="$on_logined"
          fail-text="Đăng nhập thất bại"
          success-text="Đăng nhập thành công"
        />
        <b-loading
          :is-full-page="false"
          v-model="isLoading"
          :can-cancel="false"
        ></b-loading>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { STORE_MODULES } from "../../store";
import { ToastNotifier } from "../../utils";

export default {
  name: "UserViewHeader",
  components: {
    "login-form": async () => (await import("@/components")).LoginForm,
    "user-badge": () => import("./components/user-badge")
  },
  data: () => ({
    isScrollTop: true,
    showNavbar: true,
    scrollPosition: 0,
    showLoginModal: false,
    isLoading: false
  }),
  computed: {
    ...mapGetters("AUTH", ["isAuthenticated", "user"]),
    _themeType() {
      return this.isScrollTop ? "is-primary-light" : "is-white";
    }
  },
  mounted: function() {
    window.addEventListener(
      "scroll",
      function() {
        const scrollTop = window.scrollY;
        // Is scrolling down
        if (scrollTop > this.scrollPosition) {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
          this.isScrollTop = scrollTop <= 70;
        }
        this.scrollPosition = scrollTop;
      }.bind(this)
    );
  },
  methods: {
    ...mapActions(STORE_MODULES.AUTH, {
      $store_login: "login"
    }),
    $on_formSubmitted(result) {
      const { success } = result;
      if (!success) {
        return;
      }
      this.showLoginModal = false;
    },
    async $on_logined() {
      this.showLoginModal = false;
    }
  }
};
</script>

<style scoped lang="scss">
#website-icon {
  width: 50px;
  height: 100%;
}

.navigate-button {
  border: none;
  font-weight: bold;
  display: block;
  height: 100%;

  &-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    > *:not(:last-child) {
      margin-right: 1rem;
    }
  }
}

#navigation-bar {
  padding: 1rem;
}
</style>
