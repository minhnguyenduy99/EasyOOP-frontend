<template>
  <div id="pending-posts-page">
    <admin-content
      title="Bài viết chờ duyệt"
      icon="pencil-alt"
      iconPack="fas"
      content-class="p-0"
    >
      <div class="is-relative is-flex">
        <section id="list-pending-post-container" class="px-3 py-5">
          <pending-post-section @selected-changed="$on_selectedPostChanged" />
        </section>
        <section id="pending-post-detail-section" class="card">
          <div class="card-content p-0">
            <pending-post-detail v-if="selectedPost" :post="selectedPost" />
            <div v-else class="p-3 is-flex is-justify-content-center">
              <span class="is-size-4 has-text-grey-light has-text-weight-medium"
                >Bạn chưa chọn bài viết</span
              >
            </div>
          </div>
        </section>
      </div>
    </admin-content>
  </div>
</template>

<script>
export default {
  name: "PendingPostsPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "pending-post-section": () => import("./pending-post-section"),
    "pending-post-detail": () => import("./pending-post-detail")
  },
  provide() {
    return {
      findPendingPosts: this.findPendingPosts
    };
  },
  data: () => ({
    selectedPost: null
  }),
  methods: {
    async findPendingPosts() {
      return {
        data: [
          {
            previous_post_id: "604782f7afcd53e6efd7cd0c",
            post_status: 1,
            next_post_id: "604782f7afcd53e6efd7cd0c",
            post_type: "series",
            post_title: "Interface Segregation Principle",
            topic_id: "60477de5372b1a7c5767a158",
            created_date: 1615426503923,
            content_file_url:
              "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1616159099/POSTS/post.md_rcmfcv.txt",
            thumbnail_file_url:
              "https://res.cloudinary.com/dml8e1w0z/image/upload/v1618147154/POSTS/Vue_js_cta_1618147154146.jpg",
            topic_title: "OOP PRINCIPLES",
            post_id: "604973c703d2ac31d8e63c83"
          },
          {
            previous_post_id: "604782f7afcd53e6efd7cd0c",
            next_post_id: "604782f7afcd53e6efd7cd0c",
            post_status: 2,
            post_type: "series",
            post_title: "Interface Segregation Principle",
            topic_id: "60477de5372b1a7c5767a158",
            created_date: 1615426503923,
            content_file_url:
              "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1615426502/POSTS/kbszppsvvcdvp1vivrtd_1612541037802__2__1615426501680",
            thumbnail_file_url:
              "https://res.cloudinary.com/dml8e1w0z/image/upload/v1618147154/POSTS/Vue_js_cta_1618147154146.jpg",
            topic_title: "OOP PRINCIPLES",
            post_id: "604973c703d2ac31d8e63c83"
          },
          {
            previous_post_id: "604782f7afcd53e6efd7cd0c",
            next_post_id: "604782f7afcd53e6efd7cd0c",
            post_status: 3,
            post_type: "series",
            post_title: "Interface Segregation Principle",
            topic_id: "60477de5372b1a7c5767a158",
            created_date: 1615426503923,
            content_file_url:
              "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1615426502/POSTS/kbszppsvvcdvp1vivrtd_1612541037802__2__1615426501680",
            thumbnail_file_url:
              "https://res.cloudinary.com/dml8e1w0z/image/upload/v1618147154/POSTS/Vue_js_cta_1618147154146.jpg",
            topic_title: "OOP PRINCIPLES",
            post_id: "604973c703d2ac31d8e63c83"
          },
          {
            previous_post_id: "604782f7afcd53e6efd7cd0c",
            post_status: 2,
            next_post_id: "604782f7afcd53e6efd7cd0c",
            post_type: "series",
            post_title: "Interface Segregation Principle",
            topic_id: "60477de5372b1a7c5767a158",
            created_date: 1615426503923,
            content_file_url:
              "https://res.cloudinary.com/dml8e1w0z/raw/upload/v1615426502/POSTS/kbszppsvvcdvp1vivrtd_1612541037802__2__1615426501680",
            thumbnail_file_url:
              "https://res.cloudinary.com/dml8e1w0z/image/upload/v1618147154/POSTS/Vue_js_cta_1618147154146.jpg",
            topic_title: "OOP PRINCIPLES",
            post_id: "604973c703d2ac31d8e63c83"
          }
        ]
      };
    },
    $on_selectedPostChanged(post) {
      this.selectedPost = post;
    }
  }
};
</script>

<style scoped lang="scss">
#pending-post-detail-section {
  position: sticky;
  width: 300px;
  height: calc(98vh - 1rem);
  top: 1rem;
  right: 0;
}

#list-pending-post-container {
  flex-grow: 1;
}
</style>
