<template>
  <div class="admin-sidebar-user-badge">
    <h1
      v-if="!reduce"
      :class="[reduce ? 'is-size-5' : 'is-size-4', 'pt-2 pb-3']"
    >
      {{ reduce ? greetUserInReduce : greetUser }}
    </h1>
    <div
      v-if="!reduce"
      class="user-badge--actions is-flex is-justify-content-space-between"
    >
      <b-dropdown>
        <template #trigger="{ active }">
          <b-button
            :label="ROLES[activeRole].text"
            type="is-primary"
            :icon-right="active ? 'chevron-up' : 'chevron-down'"
          />
        </template>
        <b-dropdown-item @click="$on_accountButtonClicked">
          <div class="media is-align-items-center">
            <b-icon
              class="media-left"
              icon="info-circle"
              size="is-medium"
              type="is-primary"
            ></b-icon>
            <div class="media-content">
              <span>Thông tin</span>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item
          v-for="role in userRolesWithoutActive"
          :key="role.id"
          @click="$on_loginWithRole(role)"
        >
          <div class="media is-align-items-center">
            <b-icon
              class="media-left"
              :icon="ROLES[role].icon"
              size="is-medium"
              type="is-primary"
            ></b-icon>
            <div class="media-content">
              <span>Đăng nhập với {{ ROLES[role].text }}</span>
            </div>
          </div>
        </b-dropdown-item>
      </b-dropdown>
      <b-button type="is-primary-dark" outlined @click="$on_logOut"
        >Đăng xuất</b-button
      >
    </div>
    <div
      v-else
      class="ha-vertical-layout-6 is-flex is-flex-direction-column is-align-items-center"
    >
      <b-button
        type="is-primary"
        icon-right="user"
        @click="$on_accountButtonClicked"
      />
      <b-button
        type="is-primary-dark"
        outlined
        icon-right="sign-out-alt"
        @click="$on_logOut"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AdminSidebarUserBadge",
  props: {
    user: {
      username: String
    },
    reduce: {
      type: Boolean,
      required: false,
      default: () => true
    }
  },
  inject: ["$p_loadPage"],
  data: () => ({
    ROLES: {
      viewer: {
        icon: "user",
        text: "Viewer",
        redirect: "Home"
      },
      creator: {
        icon: "user-edit",
        text: "Creator",
        redirect: "ListPosts"
      },
      manager: {
        icon: "user-tie",
        text: "Quản lí",
        redirect: "PostVerification"
      },
      admin: {
        icon: "user-cog",
        text: "Quản trị",
        redirect: "Q&A"
      }
    }
  }),
  computed: {
    ...mapGetters("AUTH", ["userRoles", "activeRole"]),
    greetUser() {
      const username = this.user?.profile?.first_name;
      return `Xin chào, ${username}`;
    },
    greetUserInReduce() {
      return this.user?.profile?.first_name;
    },
    userRolesWithoutActive() {
      return this.userRoles.filter(role => role !== this.activeRole);
    }
  },
  methods: {
    ...mapActions("AUTH", ["logout", "loginAsRole"]),
    $on_logOut() {
      this.$p_loadPage(true);
      this.logout().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$router.push({ name: "Home" });
        setTimeout(() => {
          this.$p_loadPage(false);
        }, 2000);
      });
    },
    $on_accountButtonClicked() {
      this.$router.push({ name: "AdminAccountInfo" });
    },
    $on_loginWithRole(role) {
      this.$p_loadPage(true);
      this.loginAsRole({ role }).then(result => {
        const { error, data } = result;
        if (error) {
          this.$p_loadPage(false);
          return;
        }
        this.$p_loadPage(false);
        location.reload();
      });
    }
  }
};
</script>
