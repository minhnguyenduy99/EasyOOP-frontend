<template>
  <div class="tag-list">
    <slot v-if="!headerless">
      <div class="tag-list__header">
        <p :class="[headerClass, 'is-size-5']">{{ headerText }}</p>
        <hr class="is-hr" />
      </div>
    </slot>
    <div v-if="isNotEmpty" class="tag-list__container buttons">
      <b-button
        size="is-small"
        type="is-primary-light"
        class="px-2 py-5 has-text-left"
        outlined
        v-for="tag in tags"
        :key="tag.id"
        @click="$emit('tag-clicked', tag)"
      >
        <span class="is-size-7 is-block">{{ tag.tag_id }}</span>
        <span class="has-text-weight-bold">{{ tag.tag_value }}</span>
      </b-button>
    </div>
    <slot v-else name="empty">
      <div class="is-flex is-justify-content-center">
        <span class="is-size-5 has-text-grey">{{ emptyText }}</span>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "TagList",
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    emptyText: String,
    headerless: {
      type: Boolean,
      required: false,
      default: () => false
    },
    headerText: String,
    headerClass: {
      type: String,
      default: () => ""
    }
  },
  computed: {
    isNotEmpty() {
      return this.tags.length > 0;
    }
  }
};
</script>
