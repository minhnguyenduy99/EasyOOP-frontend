<template>
  <div id="post-detail-page">
    <post-view
      v-if="post !== null"
      :post="post"
      index-sticky-top="50px"
      index-title="Mục lục"
    />
  </div>
</template>

<script>
export default {
  name: "PostDetailPage",
  components: {
    "post-view": async () => (await import("@/components")).PostPreview
  },
  props: {
    postId: String
  },
  data: () => ({
    post: null
  }),
  created: function() {
    this.$_requestPost();
  },
  watch: {
    postId(val) {
      if (!val) {
        this.$router.push({
          name: "Home"
        });
        return;
      }
      this.$_requestPost();
    }
  },
  methods: {
    $_requestPost() {
      this.$api.posts.getPostById(this.postId).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.post = data;
      });
    }
  }
};
</script>
