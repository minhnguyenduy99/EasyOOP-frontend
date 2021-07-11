export default {
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    createdDateInStr() {
      return new Date(this.post?.created_date).toLocaleString("vi", {
        hour12: true,
        dateStyle: "full"
      });
    },
    isActive() {
      return this.post?.post_status === 0;
    },
    postStatus() {
      switch (this.post?.post_status) {
        case 0:
          return {
            text: "Đã duyệt",
            color: "has-text-success"
          };
        case 1:
          return {
            text: "Chờ duyệt tạo",
            color: "has-text-primary"
          };
        case 2:
          return {
            text: "Chờ duyệt cập nhật",
            color: "has-text-primary"
          };
        case 3:
          return {
            text: "Chờ duyệt xóa",
            color: "has-text-danger"
          };
      }
      return null;
    }
  }
};
