<script>
import { FileReadHelper } from "../../../utils";
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
      const {
        post_title,
        tags,
        topic_id,
        previous_post_id,
        previous_post,
        thumbnail_file_url,
        templates
      } = this.post;
      this.form = {
        post_title,
        topic_id,
        previous_post_id,
        tags: tags.map(tag => tag.tag_id),
        templates
      };
      this.$_thumbnailFileFromURL(thumbnail_file_url);
      this.selectedPost = previous_post;
      this.selectedTags = [...tags];
      this.searchPostValue =
        previous_post?.post_title ?? this.DEFAULT_POST.post_title;
      this.thumbnailDataURL = this.post.thumbnail_file_url;
    },
    $_thumbnailFileFromURL(url) {
      FileReadHelper.toBlobFromURL(url).then(blob => {
        const file = new File([blob], "unknown");
        console.log(file);
        this.form.thumbnail_file = file;
      });
    }
  },
  watch: {
    topics(val) {
      this.selectedTopicIndex = val.findIndex(
        topic => topic.topic_id === this.form.topic_id
      );
    }
  }
};
</script>
