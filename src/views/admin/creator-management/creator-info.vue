<template>
  <div class="creator-info">
    <div class="avatar-wrapper">
      <b-image
        class="creator-info--avatar"
        ratio="1by1"
        :src="avatar"
        rounded
      />
    </div>
    <div class="is-flex is-flex-direction-column py-3 is-align-items-center">
      <span class="is-size-5 has-text-weight-bold">{{
        creator.profile.display_name
      }}</span>
      <span class="mt-1 mr-1 is-italic">({{ creator.alias }})</span>
    </div>
    <div class="creator-info-detail py-3">
      <b-tabs v-model="activeIndex" type="is-boxed">
        <b-tab-item>
          <template #header>
            <span class="has-text-weight-bold has-text-grey">Thông tin</span>
          </template>
          <div class="field-info-group">
            <div class="field-info">
              <div class="field-info-label">User ID</div>
              <div class="field-info-value">
                {{ creator.user_id }}
              </div>
            </div>
            <div class="field-info">
              <div class="field-info-label">Ngày tham gia</div>
              <div class="field-info-value">
                {{ joinDate }}
              </div>
            </div>
            <div class="field-info">
              <div class="field-info-label">Tình trạng hoạt động</div>
              <div
                class="field-info-value has-text-weight-bold"
                :style="{ color: loginStatusColor }"
              >
                {{ loginStatus }}
              </div>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import CreatorMixin from "./creator.mixin";

export default {
  name: "CreatorInfo",
  mixins: [CreatorMixin],
  data: () => ({
    activeIndex: 0
  })
};
</script>

<style scoped lang="scss">
.avatar-wrapper {
  width: 50%;
  margin: 0 auto;
}

.field-info {
  &-group {
    @extend .ha-vertical-layout-6;
  }
  &-label {
    font-weight: bold;
    color: black;
    opacity: 0.5;
  }
}
</style>
