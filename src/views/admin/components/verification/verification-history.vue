<template>
  <div class="verification-history">
    <b-collapse
      v-for="({ verification_id, created_date, status, type },
      index) in verifications"
      :key="verification_id"
      :open="false"
      class="card"
      animation="slide"
      aria-id="contentIdForA11y3"
    >
      <template #trigger="{ open }">
        <div
          class="card-header is-justify-content-space-between p-3 is-align-items-center"
        >
          <div>
            <p class="has-text-weight-bold">
              {{ new Date(created_date).toLocaleDateString("en-GB") }}
              <b-tooltip
                :label="VER_STATUS_STYLES[status].text"
                position="is-right"
                :type="VER_STATUS_STYLES[status].type"
              >
                <b-icon
                  :icon="VER_STATUS_STYLES[status].icon"
                  :type="VER_STATUS_STYLES[status].type"
                />
              </b-tooltip>
            </p>
            <b-tag type="is-primary-dark" class="has-text-weight-bold">
              {{ VERIFICATION_TYPE_STYLES[type].text }}
            </b-tag>
          </div>
          <b-icon :icon="open ? 'chevron-down' : 'chevron-left'" />
        </div>
      </template>
      <div class="card-content p-0">
        <verification-history-item :verification="verifications[index]" />
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "VerificationHistory",
  components: {
    "verification-history-item": () => import("./verification-history-item.vue")
  },
  props: {
    verifications: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    VERIFICATION_TYPE_STYLES: {
      1: {
        type: "is-primary",
        text: "Duyệt tạo"
      },
      2: {
        type: "is-primary-dark",
        text: "Duyệt cập nhật"
      },
      3: {
        type: "is-danger",
        text: "Duyệt xóa"
      }
    },
    VER_STATUS_STYLES: {
      0: {
        type: "is-danger",
        icon: "times-circle",
        text: "Không được duyệt"
      },
      1: {
        type: "is-success",
        icon: "check-circle",
        text: "Đã được duyệt"
      },
      2: {
        type: "is-primary",
        icon: "clock",
        text: "Đang chờ"
      },
      3: {
        type: "is-danger",
        icon: "ban",
        text: "Hủy duyệt"
      }
    }
  })
};
</script>
