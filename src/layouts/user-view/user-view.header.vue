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
        <template #start>
          <b-navbar-item tag="div">
            <div class="navigate-button-group">
              <b-dropdown :triggers="['click']">
                <template #trigger="{ active }">
                  <b-button
                    class="navigate-button"
                    type="is-primary-light"
                    :icon-right="active ? 'chevron-up' : 'chevron-down'"
                  >
                    <span>
                      CHỦ ĐỀ
                    </span>
                  </b-button>
                </template>
                <b-dropdown-item
                  v-for="topic in listTopics"
                  :key="topic.id"
                  paddingless
                  @click="$_navigateToTopic(topic)"
                >
                  <div
                    class="is-flex is-justify-content-space-between is-align-items-center p-3"
                  >
                    <div class="is-flex is-flex-direction-column">
                      <span
                        class="is-size-6 has-text-weight-bold has-text-primary"
                        >{{ topic.topic_title }}</span
                      >
                    </div>
                    <div class="px-3">
                      <span class="is-size-5 has-text-grey">{{
                        topic.post_count
                      }}</span>
                    </div>
                  </div>
                </b-dropdown-item>
              </b-dropdown>
              <b-button
                class="navigate-button link"
                type="is-primary-light"
                tag="router-link"
                :to="{ name: 'Home' }"
              >
                BÀI TEST
              </b-button>
              <b-button
                class="navigate-button is-icon-button"
                size="is-medium"
                type="is-primary-dark"
                icon-right="search"
                @click="showSearchModal = true"
              />
            </div>
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
    <b-modal v-model="showSearchModal" class="search-modal">
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
    "search-modal": () => import("./components/search-modal")
  },
  inject: ["$p_showLoginModal", "headerTransition"],
  provide() {
    return {
      $toggleSearchModal: this.$_toggleSearchModal.bind(this)
    };
  },
  data: () => ({
    isScrollTop: true,
    showNavbar: true,
    scrollPosition: 0,
    isLoading: false,
    listTopics: [],
    showSearchModal: false
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
    this.$_searchTopics();
    document.body.classList.add("has-navbar-fixed-top");
  },
  // beforeDestroy: function() {
  //   window.removeEventListener("scroll");
  // },
  methods: {
    ...mapActions(STORE_MODULES.AUTH, {
      $store_login: "login"
    }),
    ...mapActions("POST", ["searchTopics"]),

    $_toggleSearchModal(value) {
      this.showSearchModal = value;
    },

    $_searchTopics() {
      this.searchTopics().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.listTopics.length = 0;
        this.listTopics.push(...data);
      });
    },

    $_navigateToTopic(topic) {
      this.$router.push({
        name: "PostView",
        params: { post_id: topic.first_post_id }
      });
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

.search-modal {
  padding-top: 4rem;
  justify-content: flex-start;
  overflow: hidden;
}
</style>
