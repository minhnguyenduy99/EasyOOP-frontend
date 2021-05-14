<template>
  <div v-if="user" id="admin-account-info-page">
    <admin-content title="Tài khoản" icon="user-circle" iconPack="fas">
      <div class="main-body-content">
        <section id="account-badge-info">
          <div class="card">
            <div class="card-content">
              <div class="image-uploader-container">
                <image-uploader
                  :src="userAvatar"
                  @image-changed="$on_avatarChanged"
                />
              </div>
              <div class="py-2">
                <div
                  class="is-flex is-flex-direction-column is-align-items-center my-3"
                >
                  <span class="is-size-5 has-text-weight-bold">{{
                    profile.display_name
                  }}</span>
                </div>
                <div class="ha-vertical-layout-5">
                  <div
                    class="is-flex is-flex-direction-column is-align-items-center"
                  >
                    <span class="is-size-6 has-text-grey mb-1"
                      >Ngày tham gia</span
                    >
                    <span class="is-size-6">{{
                      new Date(user.created_date).toLocaleDateString("en-GB")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <b-tabs class="is-paddingless">
            <b-tab-item>
              <template #header>
                <div class="tab-header">
                  <span>
                    Tài khoản
                  </span>
                </div>
              </template>
              <div class="card">
                <div class="card-content">
                  <account-section />
                </div>
              </div>
            </b-tab-item>
            <b-tab-item v-for="role in filteredRoles" :key="role.id">
              <template #header>
                <div class="tab-header">
                  <span>
                    {{ ROLE_MAPPING[role].text }}
                  </span>
                </div>
              </template>
              <div class="card">
                <div class="card-content">
                  <creator-section v-if="role === 'creator'" />
                  <manager-section v-else-if="role === 'manager'" />
                </div>
              </div>
            </b-tab-item>
          </b-tabs>
        </section>
      </div>
    </admin-content>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ToastNotifier } from "../../../utils";
export default {
  name: "AdminAccountInfoPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "image-uploader": () => import("./image-uploader/image-uploader"),
    "account-section": () => import("./account-section/account-section"),
    "creator-section": () => import("./creator-section/creator-section"),
    "manager-section": () => import("./manager-section/manager-section")
  },
  data: () => ({
    ROLE_MAPPING: {
      manager: {
        text: "Quản lí"
      },
      creator: {
        text: "Tác giả"
      }
    },
    user: null
  }),
  mounted: function() {
    this.$_getUserInfo();
  },
  computed: {
    ...mapGetters("AUTH", ["userRoles", "activeRole"]),

    userAvatar() {
      return this.profile?.profile_pic;
    },
    filteredRoles() {
      return [this.activeRole];
    },
    profile() {
      return this.user?.profile;
    }
  },
  methods: {
    ...mapActions("AUTH", ["updateAvatar", "loginAsRole", "getUserInfo"]),
    ...mapActions("CREATOR", ["creatorRole_updateCreator"]),

    $on_avatarChanged(file) {
      this.updateAvatar({ avatar: file }).then(result => {
        const { error } = result;
        if (error) {
          ToastNotifier.error(this.$buefy.toast, "Cập nhật ảnh thất bại");
          return;
        }
        ToastNotifier.success(this.$buefy.toast, "Cập nhật ảnh thành công");
      });
    },

    $_getUpdateRoleAPI(role) {
      switch (role) {
        case "manager":
          return null;
        case "creator":
          return this.creatorRole_updateCreator;
      }
    },

    $_getUserInfo() {
      this.getUserInfo().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.user = data;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.main-body-content {
  @extend .ha-vertical-layout-5;

  .image-uploader-container {
    max-width: 200px;
    margin: 0 auto;
  }

  @include tablet {
    width: 80%;
    margin: 0 auto;

    .image-uploader-container {
      max-width: 200px;
    }
  }

  @include desktop {
    width: 100%;
    display: grid;
    grid-template-columns: 250px 1fr;
    column-gap: 2rem;
  }
}

.tab-header {
  min-width: 100px;
  display: flex;
  justify-content: center;
}

#account-badge-info {
  margin-top: 2.5rem;
}
</style>
