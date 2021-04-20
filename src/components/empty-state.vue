<template>
  <div class="empty-state">
    <b-image class="empty-state-image" :src="imageSrc" />
    <div class="empty-state-text">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyState",
  props: {
    imageSrc: String,
    text: String
  }
};
</script>

<style scoped lang="scss">
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-image {
    padding: 1rem;
    max-width: 164px;
    height: 100%;
  }

  &-text {
    color: $grey-light;
    font-size: $size-5;
  }
}
</style>
