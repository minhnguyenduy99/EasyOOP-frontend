<template>
  <div class="tag-list">
    <slot v-if="!headerless">
      <div class="tag-list__header">
        <p :class="[headerClass, 'is-size-5']">{{ headerText }}</p>
        <hr class="is-hr" />
      </div>
    </slot>
    <div v-if="isNotEmpty" class="tag-list__container buttons">
      <slot name="tags" v-bind="{ tags }">
        <b-button
          size="is-small"
          type="is-primary-light"
          :class="[displayTagId ? 'px-2 py-5 has-text-left' : '']"
          outlined
          :rounded="rounded"
          v-for="tag in tags"
          :key="tag.id"
          @click="$emit('tag-clicked', tag)"
        >
          <span v-if="displayTagId" class="is-size-7 is-block">{{
            tag.tag_id
          }}</span>
          <span class="has-text-weight-bold">{{ tag.tag_value }}</span>
        </b-button>
      </slot>
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
    displayTagId: {
      type: Boolean,
      default: () => true
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
    },
    rounded: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    isNotEmpty() {
      return this.tags.length > 0;
    }
  }
};
</script>

<style lang="scss">
.tag-list {
  &__container {
    > * {
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
