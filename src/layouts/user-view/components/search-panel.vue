<template>
  <div class="search-panel">
    <b-collapse :open="open" animation="slide" class="card">
      <template #trigger="{ open: tabOpen }">
        <!-- <div class="panel-header">
          <span class="is-size-4">{{ panelTitle }}</span>
          <hr class="is-hr" />
        </div> -->
        <div class="card-header is-primary" role="button">
          <p class="card-header-title">
            {{ panelTitle }}
          </p>
          <a class="card-header-icon">
            <b-icon
              type="is-primary"
              :icon="tabOpen ? 'chevron-down' : 'chevron-left'"
            >
            </b-icon>
          </a>
        </div>
      </template>
      <div
        v-if="items.length > 0"
        :class="[panelContentClass ? panelContentClass : 'panel-content']"
      >
        <div
          v-for="item in items"
          :key="item.id"
          class="panel-item is-clickable"
        >
          <slot name="item" v-bind="{ item }" />
        </div>
      </div>
      <div v-else class="is-flex is-justify-content-center py-5">
        <slot name="empty">
          <p class="is-size-5 has-text-grey">{{ emptyText }}</p>
        </slot>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "SearchPanel",
  props: {
    panelTitle: String,
    open: {
      type: Boolean,
      default: () => true
    },
    items: {
      type: Array,
      default: () => []
    },
    emptyText: String,
    panelContentClass: String
  }
};
</script>
