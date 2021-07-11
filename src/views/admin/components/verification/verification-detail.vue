<template>
  <div class="verification-detail ha-vertical-layout-6">
    <div class="px-3 py-3">
      <div class="ha-vertical-layout-7">
        <div class="field-info">
          <span class="field-info__label">ID</span>
          <span class="field-info__value">{{
            verification.verification_id
          }}</span>
        </div>
        <div class="field-info">
          <span class="field-info__label">Tình trạng duyệt</span>
          <span
            :class="[
              'field-info__value',
              'has-text-weight-bold',
              verificationStatus.color
            ]"
            >{{ verificationStatus.text }}</span
          >
        </div>
        <div class="field-info">
          <span class="field-info__label">Loại duyệt</span>
          <span
            :class="[
              'field-info__value',
              'has-text-weight-bold',
              verificationType.color
            ]"
            >{{ verificationType.text }}</span
          >
        </div>
        <div class="field-info">
          <span class="field-info__label">Tác giả</span>
          <span class="field-info__value">{{ creatorName }}</span>
        </div>
        <div class="field-info">
          <span class="field-info__label">Duyệt bởi</span>
          <span class="field-info__value">{{ managerName }}</span>
        </div>
        <div class="field-info">
          <span class="field-info__label">Ngày tạo</span>
          <span class="field-info__value">{{ createdDateInStr }}</span>
        </div>
      </div>
    </div>
    <slot
      name="custom-info"
      v-bind="{ data: verification ? verification.custom_info : {} }"
    >
      <div>
        <div class="verification-detail__header">
          <span>Thông tin khác</span>
          <hr />
        </div>
        <div class="verification-detail__content">
          <ValidationObserver
            tag="form"
            ref="validator"
            class="ha-vertical-layout-6 is-flex is-flex-direction-column"
            v-slot="{ untouched }"
          >
            <validated-form-element label="Tin nhắn" placeholder="Tin nhắn">
              <b-input
                v-model.lazy="customInfo.message"
                placeholder="Lời nhắn"
                type="textarea"
                :disabled="!isPending"
              />
            </validated-form-element>
            <b-button
              v-if="isPending"
              type="is-primary"
              :loading="loading"
              :disabled="untouched"
              @click.prevent="$on_updateVerification"
              >Cập nhật</b-button
            >
          </ValidationObserver>
        </div>
      </div>
    </slot>
    <div v-if="actionHeaderText" class="verification-detail__actions">
      <slot name="actions" v-bind="{ verification }" />
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";
import { VERIFICATION_STATUSES } from "@/utils";
import { VerificationMixin } from "@/mixins";

export default {
  name: "VerificaitonInfoTab",
  components: {
    ValidatedFormElement,
    ValidationObserver
  },
  mixins: [VerificationMixin],
  props: {
    loading: {
      type: Boolean,
      default: () => false
    },
    actionHeaderText: String
  },
  data: () => ({
    VERIFICATION_STATUS_STYLES: {
      0: {
        color: "has-text-danger",
        text: "Không được duyệt"
      },
      1: {
        color: "has-text-success",
        text: "Đã duyệt"
      },
      2: {
        color: "has-text-primary",
        text: "Đang chờ"
      },
      3: {
        color: "has-text-primary-dark",
        text: "Đã hủy"
      }
    },
    VERIFICATION_TYPE_STYLES: {
      1: {
        color: "has-text-primary",
        text: "Duyệt tạo"
      },
      2: {
        color: "has-text-primary-dark",
        text: "Duyệt cập nhật"
      },
      3: {
        color: "has-text-danger",
        text: "Duyệt xóa"
      }
    },
    customInfo: {
      message: ""
    },
    isButtonLoading: false
  }),
  mounted: function() {
    if (!this.verification) {
      return;
    }
    this.customInfo = { ...this.verification?.custom_info };
  },
  watch: {
    verification(val) {
      if (!val) {
        return;
      }
      this.customInfo = { ...val?.custom_info };
    }
  },
  computed: {
    verificationStatus() {
      return this.VERIFICATION_STATUS_STYLES[this.verification?.status] ?? {};
    },
    verificationType() {
      return this.VERIFICATION_TYPE_STYLES[this.verification?.type] ?? {};
    },
    isPending() {
      return this.verification.status === VERIFICATION_STATUSES.PENDING;
    }
  },
  methods: {
    $on_updateVerification() {
      this.$emit("update", { custom_info: this.customInfo });
      this.$refs.validator.reset();
    }
  }
};
</script>

<style lang="scss">
@import "./field-info.scss";

.verification-detail {
  &::-webkit-scrollbar {
    width: 5px;
  }
}

.verification-detail {
  &__header {
    @extend .has-text-weight-bold, .mx-3, .is-size-5, .has-text-grey;

    > hr {
      margin: 5px -0.75rem 10px -0.75rem;
      height: 1px;
      background: grey;
    }
  }
  &__content {
    @extend .p-3;
  }
}
</style>
