<template>
  <div class="user-badge">
    <b-dropdown v-model="open" position="is-bottom-left">
      <template #trigger>
        <b-button
          :selected="open"
          type="is-primary"
          class="user-badge__trigger is-badge-button p-0"
          size="is-medium"
        >
          <span class="is-size-6 has-text-weight-bold ml-3">{{
            user.profile.last_name
          }}</span>
          <b-image
            class="badge-avatar is-coverable"
            :src="user.profile.profile_pic"
            rounded
            ratio="1by1"
          />
        </b-button>
      </template>
      <b-dropdown-item custom class="user-badge-profile">
        <div class="media">
          <div class="media-left">
            <img
              class="badge-avatar-detail is-coverable"
              :src="user.profile.profile_pic"
            />
          </div>
          <div class="media-content">
            <div class="is-size-6 has-text-weight-bold">
              {{ user.profile.display_name }}
            </div>
            <div class="is-flex is-align-items-center mt-0">
              <span class="has-text-grey is-size-7">ID</span>
              <span
                class="has-text-primary is-size-7 ml-2 is-clickable"
                @click="$_copyUserID"
                >{{ user.user_id }}</span
              >
              <!-- <b-button
                inverted
                size="is-small"
                rounded
                type="is-primary"
                class="p-0 px-1"
                @click="$_copyUserID"
                >{{ user.user_id }}</b-button
              > -->
            </div>
            <b-button
              class="mt-1"
              outlined
              rounded
              size="is-small"
              type="is-primary-dark"
              tag="router-link"
              :to="{ name: 'PersonalAccountInfo' }"
              >Xem thông tin</b-button
            >
          </div>
        </div>
      </b-dropdown-item>
      <b-dropdown-item separator />
      <b-dropdown-item
        v-if="activeRole !== 'viewer'"
        @click="
          $on_navigate(
            activeRole === 'creator' ? 'ListPosts' : 'PostVerification'
          )
        "
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
import { ToastNotifier } from "../../../utils";
export default {
  name: "UserBadge",
  props: {
    user: {
      type: Object,
      default: () => null
    }
  },
  inject: ["$p_loadPage"],
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
        redirect: "ListPosts"
      },
      manager: {
        icon: "user-tie",
        text: "Đăng nhập với Manager",
        redirect: "PostVerification"
      },
      admin: {
        icon: "users-cog",
        text: "Đăng nhập với Admin",
        redirect: "Q&A"
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
      this.$p_loadPage(true);
      this.logout().then(success => {
        if (!success) {
          this.$p_loadPage(false);
          return;
        }
        location.reload();
      });
    },

    $on_navigate(name) {
      this.$router.push({ name });
    },

    $_copyUserID() {
      const el = document.createElement("textarea");
      el.value = this.user?.user_id;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      ToastNotifier.success(this.$buefy.toast, "Sao chép ID người dùng");
    }
  }
};
</script>

<style scoped lang="scss">
.user-badge {
  border-radius: 1000px;
  // &-avatar {
  //   border-radius: 50%;
  //   border: 2px solid transparent;
  //   box-sizing: border-box;
  //   width: calc(48px - 4px);
  //   height: 100%;
  // }

  &__trigger {
    border-radius: 1000px;
    height: fit-content;
  }

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

.badge-avatar-detail {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  max-height: 100% !important;
}
</style>
