<template>
  <div class="topic-detail card">
    <div class="card-content">
      <div class="topic-detail--info mb-5">
        <slot name="info" v-bind="topic">
          <h1 class="is-size-3 has-text-weight-bold mb-2">
            {{ topic.topic_title }}
          </h1>
          <h3 class="is-size-4">{{ topic.topic_description }}</h3>
        </slot>
      </div>
      <div class="topic-detail--actions">
        <b-button tag="router-link" to="/" type="is-primary" outlined>{{
          startButtonLabel
        }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import TopicDetailMixin from "./topic-detail.mixin";

export default {
  name: "TopicDetail",
  mixins: [TopicDetailMixin],
  props: {
    startButtonLabel: String
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
}
</style>
