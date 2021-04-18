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
          <b-menu-list label="NAVIGATION">
            <b-menu-item
              v-for="(item, index) in navigations"
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
  inject: ["user"],
  data: () => ({
    reduce: false,
    open: true,
    navigations: [
      {
        name: "Dashboard",
        icon: "th-large",
        pack: "fas",
        title: "Dashboard",
        to: { name: "Dashboard" }
      },
      {
        name: "CreatePost",
        icon: "pencil-alt",
        pack: "fas",
        title: "Tạo bài viết",
        to: { name: "CreatePost" }
      },
      {
        name: "ListPosts",
        icon: "clipboard",
        pack: "fas",
        title: "Danh sách bài viết",
        to: { name: "ListPosts" }
      },
      {
        name: "PendingPosts",
        icon: "clipboard-check",
        pack: "fas",
        title: "Bài viết chờ duyệt",
        to: { name: "PendingPosts" }
      },
      {
        name: "Q&A",
        icon: "question-circle",
        pack: "fas",
        title: "Q&A",
        to: { name: "Q&A" }
      }
    ],
    currentViewIndex: 0
  }),
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      vm.$root.$store.commit("setCurrentView", to.name);
    });
  },
  created: function() {
    this.currentViewIndex = this.navigations.findIndex(
      navItem => navItem.name === this.currentView
    );
  },
  watch: {
    appCurrentView(val) {
      this.currentViewIndex = this.navigations.findIndex(
        navItem => navItem.name === this.appCurrentView
      );
    }
  },
  computed: {
    ...mapGetters(["appCurrentView"])
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
