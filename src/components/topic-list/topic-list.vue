<template>
  <div class="topic-list ha-vertical-layout-5 px-3 py-5">
    <div v-for="topic in topics" :key="topic.id">
      <slot name="topic-item" v-bind:topic="topic">
        <topic-list-item
          :topic="topic"
          :to="to"
          :active-post-id="activePostId"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import TopicListMixin from "./topic-list.mixin";

export default {
  name: "TopicList",
  mixins: [TopicListMixin],
  components: {
    "topic-list-item": () => import("./topic-list-item")
  },
  props: {
    title: String,
    to: Function,
    activePostId: String
  }
};
</script>

<style scoped lang="scss">
$topic-list-background: rgb(250, 250, 250);
.topic-list {
  background: $topic-list-background;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
</style>
