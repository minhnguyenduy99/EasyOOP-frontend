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
        type="is-primary-dark"
        :shadow="false"
      >
        <template #brand>
          <b-navbar-item tag="router-link" to="/" class="px-3">
            <img
              id="website-icon"
              src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1624886684/oop-learning-helper/logo_lkpsia.png"
              width="36"
              height="36"
            />
          </b-navbar-item>
        </template>
        <template #start class="is-align-items-center">
          <b-navbar-dropdown boxed class="is-navbar-fullwidth">
            <template #label>
              <p class="has-text-weight-bold">CHỦ ĐỀ</p>
            </template>
            <posts-by-topic-panel />
          </b-navbar-dropdown>
          <b-navbar-dropdown boxed class="is-navbar-fullwidth">
            <template #label>
              <p class="has-text-weight-bold">BÀI TEST</p>
            </template>
            <tests-by-topic-panel />
          </b-navbar-dropdown>
          <b-navbar-item tag="div">
            <b-button
              rounded
              type="is-primary"
              icon-right="search"
              @click="showSearchModal = true"
            />
          </b-navbar-item>
        </template>
        <template #end>
          <b-navbar-item tag="div">
            <div class="is-flex">
              <b-button
                v-if="!isAuthenticated"
                type="is-primary"
                class="has-text-weight-bold"
                @click="$p_showLoginModal"
                >ĐĂNG NHẬP</b-button
              >
              <user-badge v-else :user="user" />
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </transition>
    <b-modal
      v-model="showSearchModal"
      class="search-modal is-content-stickable"
      full-screen
    >
      <search-modal />
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { STORE_MODULES } from "../../store";

export default {
  name: "UserViewHeader",
  components: {
    "user-badge": () => import("./components/user-badge"),
    "search-modal": () => import("./components/search-modal"),
    "posts-by-topic-panel": () => import("./components/posts-by-topic-panel"),
    "tests-by-topic-panel": () => import("./components/tests-by-topic-panel")
  },
  inject: ["$p_showLoginModal", "headerTransition"],
  provide() {
    return {
      $toggleSearchModal: this.$_toggleSearchModal.bind(this),
      $toggleDropdown: this.$_toggleDropdown.bind(this)
    };
  },
  data: () => ({
    isScrollTop: true,
    showNavbar: true,
    scrollPosition: 0,
    isLoading: false,
    listTopics: [],
    showSearchModal: false,
    currentDropdownIndex: -1
  }),
  computed: {
    ...mapGetters("AUTH", ["isAuthenticated", "user"]),
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

    $_toggleSearchModal(value) {
      this.showSearchModal = value;
    },

    $on_itemClicked(index) {
      this.$refs["navbar-dropdown"][index]?.toggle();
    },

    $_toggleDropdown() {
      const [postDropdown, testDropdown] = [
        this.$refs.dropdown0,
        this.$refs.dropdown1
      ];
      this.currentDropdownIndex === 0 && postDropdown.toggle();
      this.currentDropdownIndex === 1 && testDropdown.toggle();
    },

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
$navbar-height: 56px;

.navigation-bar {
  transition-delay: 150ms;
  transition: $navbar-transition;
}

.navigate-button {
  font-weight: bold;
  border: none;

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

.search-modal {
  padding-top: 4rem;
}
</style>
