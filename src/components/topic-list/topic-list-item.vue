<template>
  <div class="topic-list-item has-text-left">
    <h3 class="topic-title mb-2 is-size-4 has-text-grey">
      {{ topic.topic_title }}
    </h3>
    <div class="topic-post-list">
      <div v-for="post in topic.list_posts" :key="post.id">
        <slot name="post">
          <router-link
            :class="[
              postClass,
              $_isPostActive(post.post_id) ? 'is-active' : ''
            ]"
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
    },
    activePostId: String
  },
  data: () => ({
    postClass:
      "topic-post-item p-2 w-100 is-block is-size-6 has-text-weight-bold"
  }),
  methods: {
    $_isPostActive(postId) {
      return postId === this.activePostId;
    },
    $_navigateTo(post) {
      return this?.to(post);
    }
  }
};
</script>

<style scoped lang="scss">
$topic-item-color: $grey;
$topic-hover-background-color: rgb(245, 245, 245);
$topic-title-border-bottom: 2px solid $grey-light;
$topic-post-list-padding: 1rem 0;

.topic-post-item {
  transition: 0.05s;
  color: $topic-item-color;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-radius: 7px;

  &:hover {
    background: $topic-hover-background-color;
    color: $primary;
  }

  &.is-active {
    background: $primary-light;
    color: $light;
  }
}

.topic-post-list {
  padding: $topic-post-list-padding;
}

.topic-title {
  border-bottom: $topic-title-border-bottom;
}
</style>
