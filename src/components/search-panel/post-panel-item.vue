<template>
  <div class="post-panel-item ha-vertical-layout-7">
    <span class="is-block is-size-5" @click="$on_clicked">{{
      item.post_title
    }}</span>
    <b-taglist>
      <b-tag v-for="tag in item.tags" :key="tag.id" type="is-primary-dark">{{
        tag
      }}</b-tag>
    </b-taglist>
  </div>
</template>

<script>
export default {
  name: "PostPanelItem",
  props: {
    item: Object
  },
  methods: {
    $on_clicked() {
      this.$emit("click", this.item);
    }
  }
};
</script>

<style scoped lang="scss">
.post-panel-item {
  &:hover {
    > span {
      color: $primary-dark;
    }
  }
}
</style>
