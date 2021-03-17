export default {
  inject: ["$api_findTopics", "$api_findPosts", "$api_findTags"],
  data: () => ({
    DEFAULT_DELAY: 500,
    DEFAULT_POST: {
      post_id: null,
      post_title: "Đây là bài viết đầu tiên"
    },
    searchPostValue: "",
    form: {
      post_title: "",
      topic_id: null,
      thumbnail_file: null,
      tags: [],
      previous_post_id: null
    },
    topics: [],
    filteredPostList: [],
    filteredTags: [],
    validator: null,
    searchInterval: null,
    thumbnailDataURL: null
  }),
  mounted: function() {
    this.$_updateListTopics();
    this.validator = this.$refs.validator;
  },
  watch: {
    searchPostValue() {
      if (this.searchInterval) {
        return;
      }
      this.$_findPosts();
    }
  },
  methods: {
    $taginput_beforeAdding(tag) {
      const isAdded = this.form.tags.includes(tag.tag_value);
      return !isAdded;
    },
    $on_postSelected(post) {
      this.form.previous_post_id = post?.post_id;
    },
    $on_SelectedThumbnailChanged() {
      const thumbnail = this.form.thumbnail_file;
      if (!thumbnail) {
        return;
      }

      let reader = new FileReader();
      reader.onload = function(e) {
        this.thumbnailDataURL = e.target.result;
      }.bind(this);

      reader.readAsDataURL(thumbnail);
    },
    $on_selectNoPreviousPost() {
      this.$refs["post-selector"].setSelected(this.DEFAULT_POST);
    },
    $on_tagInputTyping(value) {
      this.$api_findTags(value).then(result => {
        const { error, data } = result;
        this.filteredTags.length = 0;
        if (error) {
          return;
        }
        this.filteredTags.push(...data);
      });
    },
    async $_updateListTopics() {
      return this.$api_findTopics().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.topics.push(...data);
      });
    },
    async $_findPosts() {
      this.searchInterval = setInterval(
        function() {
          this.$api_findPosts(this.searchPostValue).then(result => {
            clearInterval(this.searchInterval);
            this.searchInterval = null;
            const { error, data } = result;
            if (error) {
              return;
            }
            this.$_updatePostList(data);
          });
        }.bind(this),
        this.DEFAULT_DELAY
      );
    },
    async $_updatePostList(data) {
      this.filteredPostList.length = 0;
      const { results } = data;
      this.filteredPostList.push(...results);
    }
  }
};
