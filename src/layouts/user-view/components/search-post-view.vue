<template>
  <div class="search-post-view card" @click="$on_clicked">
    <div class="card-content">
      <div class="mb-3">
        <span class="post-view-title has-text-weight-bold is-size-5">{{
          post.post_title
        }}</span>
      </div>
      <div class="post-view-info is-flex is-justify-content-space-between">
        <div class="is-flex">
          <span class="is-size-6 has-text-grey">{{ post.topic_title }}</span>
        </div>
        <span class="is-size-6 has-text-grey">{{ createdDateInStr }}</span>
      </div>
      <b-taglist class="mt-3">
        <b-tag
          v-for="tag in post.tags"
          :key="tag.id"
          type="is-primary-dark"
          rounded
          size="is-small"
          >{{ tag.tag_value }}</b-tag
        >
      </b-taglist>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPostView",
  props: {
    post: Object
  },
  computed: {
    createdDateInStr() {
      return new Date(this.post?.created_date).toLocaleDateString("en-GB");
    }
  },
  methods: {
    $on_clicked() {
      this.$emit("click", this.post);
    }
  }
};
</script>

<style scoped lang="scss">
.search-post-view.card {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  transition: 0.05s ease-in;
  cursor: pointer;
  border-radius: 0;

  &:hover {
    border-left: 3px solid $primary;
  }

  .card-content {
    padding: 0.75rem;
  }
}
</style>
