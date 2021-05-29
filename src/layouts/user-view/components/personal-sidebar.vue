<template>
  <div class="card">
    <div class="card-content p-0">
      <div
        class="is-flex py-5 px-5 ha-vertical-layout-5 is-flex-direction-column"
      >
        <image-uploader :src="userAvatar" @image-changed="$on_avatarChanged" />
        <div class="is-flex is-justify-content-center">
          <span class="is-size-5 has-text-weight-bold">{{
            profile.display_name
          }}</span>
        </div>
      </div>
      <hr class="is-hr" />
      <b-menu>
        <b-menu-list>
          <b-menu-item
            v-for="(nav, index) in navigations"
            :key="nav.id"
            tag="router-link"
            :to="nav.to"
            :active="index === currentNavIndex.value"
          >
            <template #label>
              <div
                :class="{
                  'navigation-item': true,
                  'is-active': index === currentNavIndex.value
                }"
              >
                <b-icon
                  class="navigation-icon"
                  :icon="nav.icon"
                  :pack="nav.pack"
                  size="is-medium"
                  type="is-primary"
                ></b-icon>
                <span class="navigation-label">{{ nav.title }}</span>
              </div>
              <!-- <b-icon
                class="navigation-icon"
                :icon="nav.icon"
                :pack="nav.pack"
                size="is-medium"
                type="is-primary"
              ></b-icon>
              <span class="navigation-label">{{ nav.title }}</span> -->
            </template>
          </b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ToastNotifier } from "@/utils";
export default {
  name: "PersonalSidebar",
  components: {
    "image-uploader": () => import("@/components/image-uploader")
  },
  inject: ["navigations", "currentNavIndex"],
  data: () => ({
    userAvatar: null,
    userName: null,
    currentViewIndex: 0
  }),
  watch: {
    profile(val) {
      this.$_updateData(val);
    }
  },
  mounted: function() {
    this.$_updateData(this.profile);
  },
  computed: {
    ...mapGetters(["appCurrentView"]),
    ...mapGetters("AUTH", ["profile"])
  },
  created: function() {
    // this.currentViewIndex = this.navigations.findIndex(
    //   navItem => navItem.name === this.appCurrentView
    // );
  },
  methods: {
    ...mapActions("AUTH", ["updateAvatar"]),
    ...mapMutations("AUTH", ["updateUserAvatar"]),

    $on_avatarChanged(file) {
      this.updateAvatar({ avatar: file }).then(result => {
        const { error, data } = result;
        if (error) {
          ToastNotifier.error(this.$buefy.toast, "Cập nhật ảnh thất bại");
          return;
        }
        const {
          data: { profile_pic }
        } = data;
        this.updateUserAvatar(profile_pic);
        ToastNotifier.success(this.$buefy.toast, "Cập nhật ảnh thành công");
      });
    },

    $_updateData(profile) {
      this.userAvatar = profile?.profile_pic;
      this.userName = profile?.display_name;
    }
  }
};
</script>

<style scoped lang="scss">
.navigation {
  &-item {
    display: flex;
    align-items: center;
    opacity: 1;
    padding: 0.5rem 0.75rem 0.5rem 0.25rem;

    &:hover {
      opacity: 1;
    }

    &.is-active {
      opacity: 1;

      .navigation {
        &-icon {
          @extend .has-text-white;
        }
        &-label {
          color: $white;
          font-weight: bold;
        }
      }
    }
  }

  &-label {
    font-size: 0.9rem;
    margin-left: 1rem;
  }
}
</style>
