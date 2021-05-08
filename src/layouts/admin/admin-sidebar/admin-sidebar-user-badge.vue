<template>
  <div class="admin-sidebar-user-badge">
    <h1 :class="[reduce ? 'is-size-5' : 'is-size-4', 'pt-2 pb-3']">
      {{ greetUser }}
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
      <b-button type="is-primary" outlined @click="$on_logOut"
        >Đăng xuất</b-button
      >
    </div>
    <div v-else class="ha-vertical-layout-6">
      <b-button type="is-primary" icon-right="user" />
      <b-button type="is-primary" outlined icon-right="sign-out-alt" />
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
        redirect: "Dashboard"
      },
      manager: {
        icon: "user-tie",
        text: "Quản lí",
        redirect: "Dashboard"
      }
    }
  }),
  computed: {
    ...mapGetters("AUTH", ["userRoles", "activeRole"]),
    greetUser() {
      const username = this.user?.profile?.first_name;
      return `Xin chào, ${username}`;
    },
    userRolesWithoutActive() {
      return this.userRoles.filter(role => role !== this.activeRole);
    }
  },
  methods: {
    ...mapActions("AUTH", ["logout", "loginAsRole"]),
    $on_logOut() {
      this.logout().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$router.push({ name: "Home" });
      });
    },
    $on_accountButtonClicked() {
      this.$router.push({ name: "AdminAccountInfo" });
    },
    $on_loginWithRole(role) {
      this.loginAsRole({ role }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$router.push({ name: this.ROLES[role].redirect });
      });
    }
  }
};
</script>
