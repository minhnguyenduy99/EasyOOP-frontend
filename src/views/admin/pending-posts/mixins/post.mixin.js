export default {
  props: {
    post: Object
  },
  computed: {
    createdDateInStr() {
      return new Date(this.post?.created_date).toLocaleString("en-US");
    },
    postStatusText() {
      switch (this.post?.post_status) {
        case 1:
          return "Chờ duyệt tạo";
        case 2:
          return "Chờ duyệt cập nhật";
        case 3:
          return "Chở duyệt xóa";
      }
      return null;
    }
  }
};
