<template>
  <div class="admin-sidebar">
    <b-sidebar fullheight position="static" :reduce="reduce" v-model="open">
      <div class="ha-vertical-layout-6 p-3">
        <div
          :class="[
            'is-flex',
            reduce
              ? 'is-justify-content-flex-start'
              : 'is-justify-content-flex-end'
          ]"
        >
          <b-button
            type="is-primary"
            outlined
            :icon-right="reduce ? 'chevron-right' : 'times'"
            size="is-small"
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
                <b-icon
                  :icon="item.icon"
                  size="is-medium"
                  :pack="item.pack"
                ></b-icon>
                <span class="--title is-size-6 ml-5">{{ item.title }}</span>
              </template>
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
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
          margin-left: -0.5em;
          span.--title {
            display: none;
          }
        }
      }
    }
  }
}
</style>
