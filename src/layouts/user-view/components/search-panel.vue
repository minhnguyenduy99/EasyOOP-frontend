<template>
  <div class="search-panel">
    <div class="panel-header">
      <span class="is-size-4">{{ panelTitle }}</span>
      <hr class="is-hr" />
    </div>
    <div :class="[panelContentClass ? panelContentClass : 'panel-content']">
      <div v-for="item in items" :key="item.id" class="panel-item is-clickable">
        <slot name="item" v-bind="{ item }" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPanel",
  props: {
    panelTitle: String,
    items: {
      type: Array,
      default: () => []
    },
    panelContentClass: String
  }
};
</script>
