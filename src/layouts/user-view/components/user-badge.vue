<template>
  <div class="user-badge">
    <b-dropdown v-model="open" position="is-bottom-left">
      <template #trigger>
        <b-button
          :selected="open"
          type="is-primary-light"
          class="is-badge-button px-4"
          size="is-medium"
        >
          <span class="is-size-6 has-text-weight-bold">{{
            user.profile.last_name
          }}</span>
          <b-image
            class="badge-avatar"
            :src="user.profile.profile_pic"
            rounded
            ratio="1by1"
          />
        </b-button>
      </template>
      <b-dropdown-item custom class="user-badge-profile">
        <div class="media">
          <div class="media-left">
            <img class="user-badge-avatar" :src="user.profile.profile_pic" />
          </div>
          <div class="media-content">
            <span class="is-size-5 has-text-weight-bold">{{
              user.profile.display_name
            }}</span>
            <b-button
              class="mt-2"
              outlined
              size="is-small"
              type="is-primary-dark"
              >Xem thông tin</b-button
            >
          </div>
        </div>
      </b-dropdown-item>
      <b-dropdown-item separator />
      <b-dropdown-item
        v-if="activeRole !== 'viewer'"
        @click="$on_navigate('Dashboard')"
      >
        <div class="media is-align-items-center">
          <b-icon
            class="media-left"
            icon="th-large"
            size="is-medium"
            type="is-primary"
          ></b-icon>
          <div class="media-content">
            <span>Quản lí</span>
          </div>
        </div>
      </b-dropdown-item>
      <b-dropdown-item separator />
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
            <span>{{ ROLES[role].text }}</span>
          </div>
        </div>
      </b-dropdown-item>
      <b-dropdown-item separator />
      <b-dropdown-item @click="$on_logout">
        <div class="media is-align-items-center">
          <b-icon
            class="media-left"
            icon="sign-out-alt"
            size="is-medium"
            type="is-primary"
          ></b-icon>
          <div class="media-content">
            <span>Đăng xuất</span>
          </div>
        </div>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserBadge",
  props: {
    user: {
      type: Object,
      default: () => null
    }
  },
  data: () => ({
    ROLES: {
      viewer: {
        icon: "user",
        text: "Đăng nhập với Viewer",
        redirect: "Home"
      },
      creator: {
        icon: "user-edit",
        text: "Đăng nhập với Creator",
        redirect: "Dashboard"
      },
      manager: {
        icon: "user-tie",
        text: "Đăng nhập với Manager",
        redirect: "Dashboard"
      }
    },
    open: false
  }),
  computed: {
    ...mapGetters("AUTH", ["userRoles", "activeRole"]),
    userRolesWithoutActive() {
      return this.userRoles.filter(role => role !== this.activeRole);
    }
  },
  methods: {
    ...mapActions("AUTH", ["logout", "loginAsRole"]),

    $on_loginWithRole(role) {
      this.loginAsRole({ role }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        location.reload();
      });
    },

    $on_logout() {
      this.logout().then(success => {
        if (!success) {
          return;
        }
        location.reload();
      });
    },

    $on_navigate(name) {
      this.$router.push({ name });
    }
  }
};
</script>

<style scoped lang="scss">
.user-badge {
  // &-avatar {
  //   border-radius: 50%;
  //   border: 2px solid transparent;
  //   box-sizing: border-box;
  //   width: calc(48px - 4px);
  //   height: 100%;
  // }

  &-trigger {
    width: fit-content;
    border: 2px solid transparent;

    > span {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      column-gap: 0.5rem !important;
    }
  }

  &-profile {
    min-width: 300px;
  }

  &-avatar {
    max-height: fit-content !important;
    width: 100%;
    width: 60px;
    height: auto;
    border-radius: 50%;
  }

  &.is-active {
    .user-badge-avatar {
      border: 2px solid white;
    }
  }
}
</style>
