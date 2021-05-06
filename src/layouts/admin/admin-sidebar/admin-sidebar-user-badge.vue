<template>
  <div class="admin-sidebar-user-badge">
    <h1 :class="[reduce ? 'is-size-5' : 'is-size-4', 'pt-2 pb-3']">
      {{ greetUser }}
    </h1>
    <div v-if="!reduce" class="user-badge--actions is-flex">
      <b-button type="is-primary" class="mr-3">Tài khoản</b-button>
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
import { mapActions } from "vuex";
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
  computed: {
    greetUser() {
      const username = this.user?.profile?.first_name;
      return `Xin chào, ${username}`;
    }
  },
  methods: {
    ...mapActions("AUTH", ["logout"]),
    $on_logOut() {
      this.logout().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$router.push({ name: "Home" });
      });
    }
  }
};
</script>
