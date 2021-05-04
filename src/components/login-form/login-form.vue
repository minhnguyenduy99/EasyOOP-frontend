<template>
  <div class="login-form ha-vertical-layout-4">
    <div class="form-header">
      <h1 class="is-size-4 has-text-weight-bold">Đăng nhập</h1>
      <hr class="is-hr" />
    </div>
    <!-- <div class="form-body">
      <ValidationObserver
        tag="form"
        ref="validator"
        class="ha-vertical-layout-5 is-flex is-flex-direction-column"
      >
        <validated-form-element name="username" rules="required">
          <b-input
            icon="user"
            v-model="form.username"
            placeholder="Tên người dùng"
          />
        </validated-form-element>
        <validated-form-element
          name="password"
          rules="required"
          type="is-primary-light"
        >
          <b-input
            icon="key"
            type="password"
            v-model="form.password"
            placeholder="Mật khẩu"
            password-reveal
          />
        </validated-form-element>
        <validated-form-element name="general">
          <b-input type="hidden" />
        </validated-form-element>
        <b-button
          type="is-primary"
          native-type="button"
          @click="$on_loginButtonClicked"
          >Đăng nhập</b-button
        >
      </ValidationObserver>
    </div> -->
    <div class="form-footer">
      <div>
        <div
          class="login-options is-flex is-flex-direction-column ha-vertical-layout-7"
        >
          <login-fb-button outlined @logined="$on_logined" />
          <login-google-button outlined @logined="$on_logined" />
        </div>
        <!-- <hr class="has-background-primary-dark" />
        <div class="register-options">
          <label>Chưa có tài khoản ?</label>
          <b-button type="is-primary-light" outlined>Đăng ký</b-button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ToastNotifier } from "../../utils";
export default {
  name: "LoginForm",
  components: {
    "login-fb-button": () => import("./facebook-login-button"),
    "login-google-button": () => import("./google-login-button")
  },
  props: {
    submitHandler: Function,
    successText: String,
    failedText: String
  },
  data: () => ({
    form: {
      username: "",
      password: ""
    }
  }),
  computed: {
    validator() {
      return this.$refs["validator"];
    }
  },
  methods: {
    async $on_loginButtonClicked() {
      this.$emit("login-clicked", {
        data: this.form,
        validator: this.validator
      });
    },
    async $on_logined(result) {
      const { error } = result;
      if (error) {
        ToastNotifier.fail(this.$buefy.toast, this.failedText);
        return;
      }
      ToastNotifier.success(this.$buefy.toast, this.successText);
      this.$emit("logined");
    }
  }
};
</script>

<style scoped lang="scss">
// .login-options {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 1rem;
// }

.register-options {
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 1rem;
  align-items: center;
}
</style>
