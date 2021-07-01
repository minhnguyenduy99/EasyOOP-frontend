<template>
  <div id="personal-account-info-page" class="panel is-primary-light">
    <p class="panel-heading is-uppercase">Thông tin tài khoản</p>
    <div class="panel-block">
      <div class="p-3 ha-vertical-layout-4">
        <profile-info-group
          v-if="userProfile"
          title="THÔNG TIN CHUNG"
          :data="userProfile"
          @submitted="$on_updateProfile"
        />
        <change-password-group
          title="THAY ĐỔI MẬT KHẨU"
          @submitted="$on_updatePassword"
          :data="passwordForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ToastNotifier } from "@/utils";

export default {
  name: "PersonalAccountInfoPage",
  components: {
    "profile-info-group": () => import("./profile-info-group"),
    "change-password-group": () => import("./change-password-group")
  },
  data: () => ({
    user: null,
    userProfile: null,
    passwordForm: {
      password: ""
    }
  }),
  metaInfo() {
    return {
      title: `Thông tin cá nhân - ${this.$appConfig.VUE_APP_NAME}`
    };
  },
  mounted: function() {
    this.$_getUserInfo();
  },
  methods: {
    ...mapActions("AUTH", ["getUserInfo", "updatePassword", "updateProfile"]),

    $_getUserInfo() {
      this.getUserInfo().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        const { profile } = data;
        this.user = data;
        this.userProfile = profile;
      });
    },
    $on_updatePassword(data) {
      const { form, validator } = data;
      this.updatePassword({ password: form.password }).then(result => {
        const { error } = result;
        if (error) {
          validator.setErrors({
            password: [error.message]
          });
          return;
        }
        ToastNotifier.success(
          this.$buefy.toast,
          "Cập nhật mật khẩu thành công"
        );
        this.passwordForm = {
          password: ""
        };
      });
    },
    $on_updateProfile(data) {
      const { form, validator } = data;
      this.updateProfile({ form }).then(result => {
        const { error } = result;
        if (error) {
          validator.setErrors({
            password: [error.message]
          });
          return;
        }
        ToastNotifier.success(this.$buefy.toast, "Cập nhật hồ sơ thành công");
      });
    }
  }
};
</script>
