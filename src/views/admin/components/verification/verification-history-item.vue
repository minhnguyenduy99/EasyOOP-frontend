<template>
  <div class="verification-history-item ha-vertical-layout-7">
    <div class="field-info">
      <span class="field-info__label">ID</span>
      <span class="field-info__value">{{ verification.verification_id }}</span>
    </div>
    <div class="field-info">
      <span class="field-info__label">Duyệt bởi</span>
      <span class="field-info__value">{{ managerName }}</span>
    </div>
    <div class="field-info">
      <span class="field-info__label">Tác giả</span>
      <span class="field-info__value">{{ creatorName }}</span>
    </div>
    <div class="field-info">
      <span class="field-info__label">Ghi chú</span>
      <span class="field-info__value">{{ customMessage }}</span>
    </div>
  </div>
</template>

<script>
import { VerificationMixin } from "@/mixins";

export default {
  name: "VerificationHistoryItem",
  mixins: [VerificationMixin],
  computed: {
    customMessage() {
      return this.verification.custom_info?.message ?? "Không có";
    }
  }
};
</script>

<style lang="scss">
.verification-history-item {
  padding: 0.75rem;
}
</style>
