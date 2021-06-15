<template>
  <b-modal
    class="list-tags-modal"
    v-bind="$attrs"
    v-on="$listeners"
    v-model="_open"
    has-modal-card
  >
    <div class="card">
      <div class="card-content">
        <div class="tag-button-container">
          <b-checkbox-button
            class="has-text-weight-bold"
            v-for="tag in tags"
            :key="tag.id"
            v-model="selectedTags"
            :native-value="tag"
            rounded
            type="is-primary-light"
          >
            <span>{{ tag[field] }}</span>
          </b-checkbox-button>
        </div>
        <hr />
        <div class="is-flex is-justify-content-flex-end">
          <b-button
            class="mr-2"
            @click="$emit('apply', selectedTags)"
            type="is-primary"
            >Áp dụng</b-button
          >
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ListTagsModal",
  props: {
    open: {
      type: Boolean,
      default: () => false
    },
    tags: {
      type: Array,
      default: () => []
    },
    field: String
  },
  model: {
    prop: "open",
    event: "opened"
  },
  data: () => ({
    tagStates: [],
    selectedTags: []
  }),
  mounted: function() {
    this.tagStates = Array(this.tags.length).fill(false);
  },
  computed: {
    _open: {
      get() {
        return this.open;
      },
      set(val) {
        this.$emit("opened", val);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.tag-button-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;

  @include tablet {
    grid-template-columns: repeat(6, 1fr);
  }

  @include desktop {
    grid-template-columns: repeat(10, 1fr);
  }
}
</style>
