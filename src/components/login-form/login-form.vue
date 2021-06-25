<template>
  <modal-form
    title="ĐĂNG NHẬP"
    rounded
    hasCard
    width="400px"
    header-class="has-background-primary-light has-text-white is-size-5 px-5 py-3"
  >
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
      <validated-form-element name="general"> </validated-form-element>
      <b-button
        type="is-primary"
        native-type="button"
        @click="$on_loginButtonClicked"
        :loading="submitLoading"
        >ĐĂNG NHẬP</b-button
      >
    </ValidationObserver>
    <hr />
    <div class="form-footer">
      <div class="ha-vertical-layout-5">
        <p class="is-size-6 has-text-grey">Hoặc đăng nhập bằng</p>
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
  </modal-form>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ToastNotifier } from "../../utils";
import ModalForm from "../modal-form";

export default {
  name: "LoginForm",
  components: {
    ModalForm,
    ValidationObserver,
    "validated-form-element": () => import("../base/validated-form-element"),
    "login-fb-button": () => import("./facebook-login-button"),
    "login-google-button": () => import("./google-login-button")
  },
  props: {
    submitHandler: Function
  },
  data: () => ({
    form: {
      username: "",
      password: ""
    },
    submitLoading: false
  }),
  computed: {
    validator() {
      return this.$refs["validator"];
    }
  },
  methods: {
    async $on_loginButtonClicked() {
      const isValid = await this.$refs.validator.validate();
      if (!isValid) {
        return;
      }
      this.submitLoading = true;
      this.submitHandler?.(this.form).then(result => {
        this.submitLoading = false;
        const { error } = result;
        if (error) {
          this.validator.setErrors({
            general: [this.$serverLocaler.getMessage(error.errorType)]
          });
          this.$emit("logined", false);
          return;
        }
        this.$emit("logined", true);
      });
    },
    async $on_logined(result) {
      const { error } = result;
      if (error) {
        this.validator.setErrors({
          general: [this.$serverLocaler.getMessage(error.errorType)]
        });
        this.$emit("logined", false);
        return;
      }
      this.$emit("logined", true);
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
