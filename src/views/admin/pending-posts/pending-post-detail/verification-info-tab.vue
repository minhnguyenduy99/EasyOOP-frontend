<template>
  <div class="verification-info-tab">
    <div class="px-3 py-3">
      <div class="pending-post-container">
        <div class="pending-post-field">
          <span class="pending-post-field--label">Tình trạng duyệt</span>
          <span
            :class="[
              'pending-post-field--value',
              'has-text-weight-bold',
              status.color
            ]"
            >{{ status.text }}</span
          >
        </div>
        <div class="pending-post-field">
          <span class="pending-post-field--label">Duyệt bởi</span>
          <span class="pending-post-field--value">{{ managerName }}</span>
        </div>
      </div>
    </div>
    <div class="pending-post-metadata">
      <div class="mb-1">
        <span class="has-text-weight-bold ml-3 is-size-5 has-text-grey"
          >Thông tin khác</span
        >
      </div>
      <hr class="is-hr mb-3" />
      <div
        class="px-3 pb-3 ha-vertical-layout-6 is-flex is-flex-direction-column"
      >
        <validated-form-element
          :disabled="!isPending"
          label="Tin nhắn"
          placeholder="Tin nhắn"
        >
          <b-input
            v-model.lazy="customInfo.message"
            placeholder="Lời nhắn"
            type="textarea"
          />
        </validated-form-element>
        <b-button
          v-if="isPending"
          :disabled="!isMetadataChanged"
          type="is-primary"
          :loading="isButtonLoading"
          @click="$_onUpdateButtonClicked"
          >Cập nhật</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ValidatedFormElement } from "@/components";
import { mapActions } from "vuex";
import { ToastNotifier } from "@/utils";
import PostMixin from "../mixins/post.mixin";

export default {
  name: "VerificaitonInfoTab",
  components: {
    ValidatedFormElement
  },
  mixins: [PostMixin],
  data: () => ({
    customInfo: {
      message: ""
    },
    isButtonLoading: false
  }),
  created: function() {
    const customInfo = this.post.custom_info;
    this.customInfo = { ...customInfo };
  },
  watch: {
    post(val) {
      if (!val) {
        return;
      }
      const customInfo = val.custom_info;
      this.customInfo = { ...customInfo };
    }
  },
  computed: {
    isMetadataChanged() {
      for (let key in this.customInfo) {
        if (this.postCustomInfo[key] !== this.customInfo[key]) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    ...mapActions("POST", ["creator_updateVerification"]),

    $_onUpdateButtonClicked() {
      this.isButtonLoading = true;
      this.creator_updateVerification({
        verification_id: this.post.verification_id,
        data: {
          custom_info: this.customInfo
        }
      }).then(result => {
        this.isButtonLoading = false;
        const { error } = result;
        if (error) {
          return;
        }
        ToastNotifier.success(this.$buefy.toast, "Cập nhật thành công");
        this.post.custom_info = { ...this.customInfo };
      });
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
