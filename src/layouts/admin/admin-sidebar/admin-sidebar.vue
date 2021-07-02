<template>
  <div class="admin-sidebar">
    <b-sidebar
      fullheight
      position="fixed"
      :reduce="reduce"
      v-model="open"
      :can-cancel="['outside']"
    >
      <div class="ha-vertical-layout-6 p-3">
        <div
          :class="{
            'is-flex is-align-items-center': true,
            'is-justify-content-center is-flex-direction-column': reduce,
            'is-justify-content-space-between': !reduce
          }"
        >
          <router-link to="/" class="is-block">
            <img
              :class="{
                'admin-sidebar__logo': true,
                'mb-3': reduce
              }"
              src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1625188482/oop-learning-helper/color_tnvl21.png"
            />
          </router-link>
          <b-button
            type="is-primary-dark"
            outlined
            :icon-right="reduce ? 'chevron-right' : 'times'"
            @click="reduce = !reduce"
          ></b-button>
        </div>
        <hr class="is-hr mt-0" />
      </div>
      <div
        :class="[
          'admin-sidebar--content',
          'p-3',
          'ha-vertical-layout-3',
          reduce ? '--reduce' : ''
        ]"
      >
        <admin-sidebar-user-badge :reduce="reduce" :user="user" />
        <b-menu :activable="false" class="is-custom-mobile">
          <b-menu-list label="BẢNG ĐIỀU KHIỂN">
            <b-menu-item
              v-for="(item, index) in authNavigations"
              :key="item.id"
              :class="['sidebar-navigation-list-item']"
              tag="router-link"
              :to="item.to"
              :active="index === currentViewIndex"
            >
              <template #label>
                <div class="is-flex is-align-items-center">
                  <b-icon
                    :icon="item.icon"
                    size="is-medium"
                    :type="index !== currentViewIndex ? 'is-primary-dark' : ''"
                    :pack="item.pack"
                  ></b-icon>
                  <span
                    :class="[
                      '--title',
                      'is-size-6',
                      'ml-5',
                      index === currentViewIndex ? 'has-text-weight-bold' : ''
                    ]"
                    >{{ item.title }}</span
                  >
                </div>
              </template>
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
    <div :class="['sidebar-filler', reduce ? '--reduce' : '']" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AdminSidebarUserBadge from "./admin-sidebar-user-badge";

export default {
  name: "AdminSidebar",
  components: {
    AdminSidebarUserBadge
  },
  inject: ["navigations"],
  data: () => ({
    reduce: false,
    open: true,
    currentViewIndex: 0
  }),
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      vm.$root.$store.commit("setCurrentView", to.name);
    });
  },
  created: function() {
    this.currentViewIndex = this.authNavigations.findIndex(
      navItem => navItem.name === this.currentView
    );
  },
  watch: {
    appCurrentView(val) {
      this.currentViewIndex = this.authNavigations.findIndex(
        navItem => navItem.name === this.appCurrentView
      );
    }
  },
  computed: {
    ...mapGetters(["appCurrentView"]),
    ...mapGetters("AUTH", ["user", "activeRole"]),
    authNavigations() {
      return this.navigations.filter(
        nav => nav.roles?.includes(this.activeRole) ?? true
      );
    }
  }
};
</script>

<style scoped lang="scss">
$sidebar-width-reduce: 80px;

.admin-sidebar {
  height: 100%;

  .b-sidebar {
    height: 100%;
  }
}
.admin-sidebar--content {
  &.--reduce {
    .menu {
      p.menu-label {
        display: none;
      }

      ul.menu-list {
        li {
          span.--title {
            display: none;
          }
        }
      }
    }
  }
}

.admin-sidebar__logo {
  height: 36px;
  width: auto;
  cursor: pointer;
}

.sidebar-filler {
  width: $sidebar-width;

  &.--reduce {
    width: $sidebar-width-reduce;
  }
}
</style>
