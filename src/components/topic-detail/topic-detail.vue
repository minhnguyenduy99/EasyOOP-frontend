<template>
  <div class="topic-detail card">
    <div
      class="card-content is-flex is-flex-direction-column is-justify-content-space-between is-align-items-stretch"
    >
      <div class="topic-detail--info mb-5">
        <slot name="info" v-bind="topic">
          <h1 class="is-size-4 has-text-weight-bold mb-2 has-text-primary">
            {{ topic.topic_title }}
          </h1>
          <h3 class="is-size-5">{{ topic.topic_description }}</h3>
        </slot>
      </div>
      <div v-if="!_isTopicEmpty" class="topic-detail--actions">
        <b-button @click="$_navigateToFirstPost" type="is-primary" outlined>{{
          startButtonLabel
        }}</b-button>
      </div>
      <slot v-else name="empty">
        <span class="is-italic is-align-self-flex-end">{{ emptyText }}</span>
      </slot>
    </div>
  </div>
</template>

<script>
import TopicDetailMixin from "./topic-detail.mixin";

export default {
  name: "TopicDetail",
  mixins: [TopicDetailMixin],
  props: {
    startButtonLabel: String,
    navigateFirstPost: {
      type: Function,
      required: false
    },
    emptyText: String
  },
  methods: {
    $_navigateToFirstPost() {
      this.navigateFirstPost?.(this.topic.first_post_id);
    }
  }
};
</script>

<style scoped lang="scss">
$topic-detail-box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
$topic-detail-box-shadow-hover: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px;

.topic-detail {
  box-shadow: $topic-detail-box-shadow;
  transition: box-shadow 0.15s;
  cursor: pointer;

  &:hover {
    box-shadow: $topic-detail-box-shadow-hover;
  }

  .card-content {
    height: 100%;
    align-items: center;
    text-align: center;
  }

  @include tablet {
    .card-content {
      align-items: flex-start;
      text-align: left;
    }

    &--actions {
      align-self: flex-end;
    }
  }
}
</style>
