<template>
  <div id="creator-management-page">
    <admin-content
      title="Quản lí người viết bài"
      icon="user-edit"
      iconPack="fas"
    >
      <admin-detail-sidebar :sidebar-card="false">
        <div class="py-3">
          <div class="admin-content-container">
            <creator-search />
            <creator-table />
          </div>
        </div>
        <template #detail-content>
          <div class="card">
            <div class="card-content p-3">
              <creator-info :creator="creator" />
            </div>
          </div>
        </template>
      </admin-detail-sidebar>
    </admin-content>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CreatorManagementPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "admin-detail-sidebar": () => import("../components/admin-detail-sidebar"),
    "creator-table": () => import("./creator-table"),
    "creator-search": () => import("./creator-search"),
    "creator-info": () => import("./creator-info")
  },
  provide() {
    return {
      $api_findCreators: this.creatorRole_findCreators
    };
  },
  data: () => ({
    creator: {
      alias: "Minh",
      profile: {
        display_name: "Nguyễn Duy Minh",
        profile_pic: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      }
    }
  }),
  methods: {
    ...mapActions("CREATOR", ["creatorRole_findCreators"])
  }
};
</script>

<style scoped lang="scss">
.admin-content-container {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
}
</style>
