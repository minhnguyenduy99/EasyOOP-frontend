<template>
  <div class="account-info form-groups">
    <form-group title="THÔNG TIN CHUNG">
      <profile-info-group :data="profile" @submitted="$on_updateProfile" />
    </form-group>
    <form-group title="THAY ĐỔI MẬT KHẨU">
      <change-password-group
        @submitted="$on_updatePassword"
        :data="passwordForm"
      />
    </form-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ToastNotifier } from "@/utils";
export default {
  name: "AccountInfo",
  components: {
    "profile-info-group": () => import("./profile-info-group"),
    "change-password-group": () => import("./change-password-group"),
    "form-group": () => import("../form-group/form-group")
  },
  data: () => ({
    passwordForm: {
      password: ""
    }
  }),
  computed: {
    ...mapGetters("AUTH", ["profile"])
  },
  methods: {
    ...mapActions("AUTH", ["updatePassword", "updateProfile"]),
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

<style scoped lang="scss">
@import "../style.scss";
</style>
