<template>
  <div class="topic-panel">
    <div class="topic-panel-title">
      <div class="is-size-6">
        <span class="topic-panel-symbol">&lt;&lt; </span>
        <span>CHỦ ĐỀ</span>
        <span class="topic-panel-symbol"> &gt;&gt;</span>
      </div>
      <h1 class="is-size-4 has-text-weight-bold">
        {{ topicTitle }}
      </h1>
    </div>
    <hr />
    <div class="py-2 px-2">
      <div
        v-for="item in items"
        :key="item.id"
        class="topic-panel-item is-flex is-align-items-center"
        @click="$emit('navigate')"
      >
        <span class="topic-panel-symbol is-size-4 mr-3">#</span>
        <router-link :to="to(item)">
          <slot name="item" v-bind="{ item }">
            {{ item[field] }}
          </slot>
        </router-link>
      </div>
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
  },
  data: () => ({
    SPECIFIER_SYMBOLS: ["#", "+", "-"]
  })
};
</script>

<style scoped lang="scss">
$topic-panel-border-color: $grey;
$topic-panel-border-radius: 7px;

.topic-panel {
  border-radius: $topic-panel-border-radius;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  transition: 0.15s ease-in;
  height: fit-content;

  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
}

hr {
  margin: 0;
  padding: 0;
  height: 1px;
  background: $topic-panel-border-color;
}

.topic-panel {
  &-title {
    border-radius: $topic-panel-border-radius $topic-panel-border-radius 0 0;
    color: $white;
    background: $primary;
    padding: 0.75rem;
    text-align: center;
  }
}

.topic-panel-item {
  font-size: $size-6;
  padding: 0.15rem 0.5rem;
  color: black;
  opacity: 0.5;
  transition: $easing;

  a {
    color: inherit;
    width: 100%;
    font-weight: $weight-semibold;
  }

  &:hover {
    opacity: 1;
  }
}

.topic-panel-symbol {
  font-weight: bold;
}
</style>
