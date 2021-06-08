<template>
  <div class="topic-panel">
    <h1 class="is-size-4 has-text-primary has-text-weight-bold">
      {{ topicTitle }}
    </h1>
    <hr class="is-hr" />
    <div class="py-3">
      <router-link
        v-for="item in items"
        :key="item.id"
        :to="to(item)"
        class="topic-panel-item"
      >
        <slot name="item" v-bind="{ item }">
          {{ item[field] }}
        </slot>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopicPanel",
  props: {
    topicTitle: String,
    items: Array,
    to: {
      type: Function,
      default: item => ({})
    },
    field: String
  }
};
</script>

<style scoped lang="scss">
.topic-panel-item {
  font-size: $size-6;
  padding: 0.25rem 0.5rem;
  margin-left: -0.5rem;
  font-weight: bold;
  display: block;
  color: black;

  &:hover {
    background: $primary-light;
    color: white;
  }
}
</style>
