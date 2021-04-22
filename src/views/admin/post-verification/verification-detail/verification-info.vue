<template>
  <div class="verification-info">
    <div class="px-3 py-3">
      <div class="info-container">
        <div class="info-field">
          <span class="info-field--label">Tình trạng duyệt</span>
          <span
            :class="['info-field--value', 'has-text-weight-bold', status.color]"
            >{{ status.text }}</span
          >
        </div>
        <div class="info-field">
          <span class="info-field--label">Duyệt bởi</span>
          <span class="info-field--value">{{ managerName }}</span>
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
        <div class="info-field">
          <span class="info-field--label">Tin nhắn</span>
          <b-input
            class="info-field--value"
            type="textarea"
            :value="customInfo.message"
            :disabled="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VerificationMixin from "../mixins/verification.mixin";

export default {
  name: "VerificationInfo",
  mixins: [VerificationMixin],
  data: () => ({
    isButtonLoading: false
  }),
  computed: {
    isMetadataChanged() {
      for (let key in this.customInfo) {
        if (this.postCustomInfo[key] !== this.customInfo[key]) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
