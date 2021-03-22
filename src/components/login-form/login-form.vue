<template>
  <div class="login-form ha-vertical-layout-4">
    <div class="form-header">
      <h1 class="is-size-4">Đăng nhập</h1>
      <hr class="is-hr" />
    </div>
    <div class="form-body">
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
    </div>
    <div class="form-footer">
      <div class="login-options">
        <div
          class="fb-login-button"
          data-width=""
          data-size="medium"
          data-button-type="login_with"
          data-layout="default"
          data-auto-logout-link="false"
          data-use-continue-as="false"
        ></div>
      </div>
      <div
        class="is-flex is-justify-content-space-between is-align-items-center"
      >
        <label>Chưa có tài khoản ?</label>
        <b-button type="is-primary-light" outlined>Đăng ký</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "../base";

export default {
  name: "LoginForm",
  components: {
    ValidationObserver,
    ValidatedFormElement
  },
  props: {
    submitHandler: Function
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
    }
  }
};
</script>
