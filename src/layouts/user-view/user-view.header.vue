<template>
  <div id="user-view-header-content">
    <transition
      name="custom-transition"
      mode="in-out"
      enter-active-class="animate__animated animate__slideInDown"
      leave-active-class="animate__animated animate__slideOutUp"
    >
      <b-navbar
        v-show="_showNavbar"
        class="navigation-bar"
        fixed-top
        :type="_themeType"
        transparent
        :shadow="_showNavbar && scrollPosition > 0"
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
                :class="{
                  'navigate-button': true
                }"
                :outlined="scrollPosition > 0"
                type="is-primary-light"
                tag="router-link"
                to="/"
                >Home</b-button
              >
              <b-button
                class="navigate-button"
                type="is-primary-light"
                :outlined="scrollPosition > 0"
                tag="router-link"
                to="/"
                >About</b-button
              >
              <b-button
                v-if="!isAuthenticated"
                class="navigate-button"
                type="is-primary-dark"
                @click="$p_showLoginModal"
                >Login</b-button
              >
              <user-badge v-else :user="user" />
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { STORE_MODULES } from "../../store";

export default {
  name: "UserViewHeader",
  components: {
    "user-badge": () => import("./components/user-badge")
  },
  inject: ["$p_showLoginModal", "headerTransition"],
  data: () => ({
    isScrollTop: true,
    showNavbar: true,
    scrollPosition: 0,
    isLoading: false
  }),
  computed: {
    ...mapGetters("AUTH", ["isAuthenticated", "user"]),
    _themeType() {
      return this.scrollPosition === 0 ? "is-primary-light" : "is-white";
    },
    _showNavbar: {
      get() {
        return !this.hasTransition || this.showNavbar;
      },
      set(val) {
        this.showNavbar = val;
      }
    },
    hasTransition() {
      return this.headerTransition.value;
    }
  },
  mounted: function() {
    this.$_injectScrollBehaviour();
    document.body.classList.add("has-navbar-fixed-top");
  },
  // beforeDestroy: function() {
  //   window.removeEventListener("scroll");
  // },
  methods: {
    ...mapActions(STORE_MODULES.AUTH, {
      $store_login: "login"
    }),

    $_injectScrollBehaviour() {
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
    }
  }
};
</script>

<style scoped lang="scss">
$navbar-transition: 500ms;
$navbar-height: 82px;

#website-icon {
  width: 50px;
  height: 100%;
}

.navigation-bar {
  transition-delay: 150ms;
  transition: $navbar-transition;
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
