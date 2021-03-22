<template>
  <div class="question-panel-item">
    <span class="question is-size-5">{{ item.question }}</span>
  </div>
</template>

<script>
export default {
  name: "QuestionPanelItem",
  props: {
    item: Object
  }
};
</script>

<style scoped lang="scss">
.question-panel-item {
  &:hover {
    span.question {
      color: $primary-light;
    }
  }
}
</style>
