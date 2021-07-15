<template>
  <b-button
    type="is-facebook"
    v-on="$listeners"
    v-bind="$attrs"
    icon-pack="fab"
    icon-left="facebook-f"
    tag="a"
    @click="$on_clicked"
  >
    FACEBOOK
  </b-button>
</template>

<script>
/* eslint-disable no-undef */
import { mapActions } from "vuex";
import { ToastNotifier } from "../../utils";
import { initFacebookSdk } from "./init-fb-sdk";

export default {
  name: "FacebookLoginButton",
  inheritAttrs: false,
  methods: {
    ...mapActions("AUTH", ["loginWithFacebookToken"]),

    $on_clicked() {
      this.loginWithFacebookToken().then(result => {
        const { error } = result;
        if (error) {
          this.$emit("logined", { error });
          return;
        }
        this.$emit("logined", {});
      });
    }
  },
  mounted: function() {
    // initFacebookSdk();
  }
};
</script>
