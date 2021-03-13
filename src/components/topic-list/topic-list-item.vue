<template>
  <div class="topic-list-item has-text-left">
    <h3 class="topic-list-item--title mb-2 is-size-5 has-text-weight-bold">
      {{ topic.topic_title }}
    </h3>
    <div class="topic-list-item--list-post">
      <div v-for="post in topic.list_posts" :key="post.id">
        <slot name="post">
          <router-link
            class="topic-list-item--list-post-item p-2 w-100 is-block is-size-6"
            :to="$_navigateTo(post)"
            >{{ post.post_title }}</router-link
          >
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopicListItem",
  props: {
    topic: {
      topic_id: String,
      topic_title: String,
      list_posts: Array
    },
    to: {
      type: Function,
      required: true
    }
  },
  methods: {
    $_navigateTo(post) {
      return this?.to(post);
    }
  }
};
</script>

<style scoped lang="scss">
$topic-item-color: $grey;

.topic-list-item--list-post-item {
  transition: 0.1s;
  color: $topic-item-color;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    background: white;
    color: $primary;
  }
}
</style>
