import { VERIFICATION_STATUSES } from "../consts";

export default {
  props: {
    post: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    createdDateInStr() {
      return new Date(this.post?.created_date).toLocaleString("en-US");
    },
    detailedPost() {
      return this.post?.post;
    },
    postStatusText() {
      switch (this.detailedPost?.post_status) {
        case 1:
          return "Chờ duyệt tạo";
        case 2:
          return "Chờ duyệt cập nhật";
        case 3:
          return "Chở duyệt xóa";
      }
      return null;
    },
    postCustomInfo() {
      return this.post.custom_info ?? {};
    },
    status() {
      return VERIFICATION_STATUSES[this.post.status];
    },
    isPending() {
      return this.post.status === 2;
    },
    managerName() {
      return this.post.manager_name ?? "Chưa có";
    }
  }
};
