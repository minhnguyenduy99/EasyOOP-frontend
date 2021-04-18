<script>
import PostForm from "../components/post-form/post-form.vue";

export default {
  name: "EditPostForm",
  extends: PostForm,
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  created: function() {
    this.$_updateFormData();
  },
  methods: {
    $_updateFormData() {
      const { post_title, tags, topic_id, previous_post_id } = this.post;
      this.form = {
        post_title,
        topic_id,
        previous_post_id,
        tags: [...tags]
      };
      this.searchPostValue = previous_post_id;
      this.thumbnailDataURL = this.post.thumbnail_file_url;
    }
  }
};
</script>
