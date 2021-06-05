export default {
  props: {
    post: {
      post_id: String,
      post_title: String,
      created_date: Number,
      topic_id: String,
      topic_title: String,
      content_file_url: String,
      thumbnail_file_url: String,
      fullContent: String,
      next_post_id: String,
      previous_post_id: String,
      templates: Array,
      tags: Array
    }
  },
  computed: {
    createdDateInString() {
      const time = this.post?.created_date;
      const date = time ? new Date(time) : new Date();
      return date.toLocaleDateString("en-GB");
    },
    hasTemplate() {
      return this.post?.templates?.length > 0;
    },
    templates() {
      return this.post?.templates;
    },
    listTagValues() {
      return this.post?.tags.map(tag => tag.tag_value);
    }
  },
  methods: {
    async $m_readFileContent() {
      const postContent = this.post?.fullContent;
      if (postContent || postContent === "") {
        return postContent;
      }
      const url = this.post?.content_file_url;
      if (!url) {
        return;
      }
      return fetch(url).then(response => response.text());
    }
  }
};
