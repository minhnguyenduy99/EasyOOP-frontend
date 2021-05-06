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
      <div>
        <span class="has-text-weight-bold is-size-5 has-text-grey"
          >Thông tin</span
        >
      </div>
      <hr class="is-hr" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatorInfo",
  props: {
    creator: Object
  },
  computed: {
    avatar() {
      return this.creator?.profile?.profile_pic;
    }
  }
};
</script>

<style scoped lang="scss">
.creator-info {
  &--avatar {
    img {
    }
  }
}

.avatar-wrapper {
  width: 50%;
  margin: 0 auto;
}
</style>
