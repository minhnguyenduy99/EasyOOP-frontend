<template>
  <div id="post-detail-page">
    <template>
      <div id="create-post-page">
        <admin-content
          title="Chi tiết bài viết"
          icon="pencil-alt"
          iconPack="fas"
        >
          <div v-if="post">
            <breadcrumb v-if="post" :titles="breadcumbInfo" :active="1" />
            <detail-post-view :post="post" />
          </div>
        </admin-content>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DetailPostView from "./detail-post-view";

export default {
  name: "PostDetailPage",
  components: {
    DetailPostView,
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    breadcrumb: () => import("@/components/base/breadcrumb.vue")
  },
  metaInfo() {
    const title = `${this.post?.post_title} | Chi tiết bài viết - ${this.$appConfig.VUE_APP_NAME}`;
    return {
      title
    };
  },
  inject: ["$p_loadPage"],
  props: {
    postId: String
  },
  data: () => ({
    post: null
  }),
  mounted: function() {
    this.$p_loadPage(true);
    this.getPostById(this.postId).then(result => {
      this.$p_loadPage(false);
      const { error, data } = result;
      if (error) {
        this.$router.push({ name: "ListPosts" });
        return;
      }
      this.post = data;
    });
  },
  watch: {
    postId(val) {
      if (!val) {
        return;
      }
      this.getPostById(this.postId).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.post = data;
      });
    }
  },
  computed: {
    breadcumbInfo() {
      return [
        {
          value: "Danh sách bài viết",
          to: {
            name: "ListPosts"
          }
        },
        {
          value: this.post.post_title
        }
      ];
    }
  },
  methods: {
    ...mapActions("POST", ["getPostById"])
  }
};
</script>
