import { VERIFICATION_STATUSES } from "../consts";

const POST_STATUSES = {
  UNVERIFIED: 0,
  VERIFIED: 1,
  PENDING: 2,
  CANCEL: 4
};

export default {
  props: {
    post: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    thumbnailUrl() {
      if (this.post.status === 0) {
        return "https://icon-library.com/images/delete-icon-png/delete-icon-png-19.jpg";
      }
      return this.detailedPost.thumbnail_file_url;
    },
    deletable() {
      return this.post.status !== POST_STATUSES.PENDING;
    },
    viewable() {
      const status = this.post.status;
      return (
        status === POST_STATUSES.VERIFIED || status === POST_STATUSES.PENDING
      );
    },
    cancellable() {
      return this.post.status === POST_STATUSES.PENDING;
    },
    createdDateInStr() {
      return new Date(this.post.created_date).toLocaleString("en-US");
    },
    detailedPost() {
      return this.post?.post ?? {};
    },
    verificationType() {
      switch (this.post.type) {
        case 1:
          return {
            text: "Duyệt tạo",
            color: "has-text-success"
          };
        case 2:
          return {
            text: "Duyệt cập nhật",
            color: "has-text-info"
          };
        case 3:
          return {
            text: "Duyệt xóa",
            color: "has-text-danger"
          };
      }
    },
    postStatus() {
      switch (this.detailedPost?.post_status) {
        case 0:
          return {
            text: "Đã duyệt",
            color: "has-text-success"
          };
        case 1:
          return {
            text: "Chờ duyệt tạo",
            color: "has-text-danger"
          };
        case 2:
          return {
            text: "Chờ duyệt cập nhật",
            color: "has-text-danger"
          };
        case 3:
          return {
            text: "Chờ duyệt xóa",
            color: "has-text-danger"
          };
      }
      return {};
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
      if (!this.post.manager_id) {
        return "Chưa có";
      }
      const verifiedBy = `${this.post.alias} (${this.post.manager_id})`;
      return verifiedBy;
    }
  }
};
