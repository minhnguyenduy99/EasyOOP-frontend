<template>
  <div class="admin-sidebar-user-badge">
    <h1 :class="[reduce ? 'is-size-5' : 'is-size-4', 'pt-2 pb-3']">
      {{ greetUser }}
    </h1>
    <div v-if="!reduce" class="user-badge--actions is-flex">
      <b-button type="is-primary" class="mr-3">Detail</b-button>
      <b-button type="is-primary" outlined>Logout</b-button>
    </div>
    <div v-else class="ha-vertical-layout-6">
      <b-button type="is-primary" icon-right="user" />
      <b-button type="is-primary" outlined icon-right="sign-out-alt" />
    </div>
  </div>
</template>

<script>
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
      const username = this.user?.username ?? "Unknown";
      return `Hello, ${username}`;
    }
  }
};
</script>
