<template>
  <b-button
    id="google-signin-button"
    type="is-google"
    v-on="$listeners"
    v-bind="$attrs"
    icon-pack="fab"
    icon-left="google"
    tag="a"
    @click="$on_clicked"
  >
    GOOGLE
  </b-button>
</template>

<script>
import { mapActions } from "vuex";
import { initGoogleSdk, signIn } from "./init-gg-sdk";

export default {
  name: "GoogleLoginButton",
  inheritAttrs: false,
  mounted: function() {
    initGoogleSdk();
  },
  methods: {
    ...mapActions("AUTH", ["loginWithGoogleToken"]),
    $on_clicked() {
      signIn().then(ggUser => {
        this.loginWithGoogleToken({
          payload: ggUser
        }).then(result => {
          const { error } = result;
          if (error) {
            this.$emit("logined", { error });
            return;
          }
          this.$emit("logined", {});
        });
      });
    }
  }
};
</script>
