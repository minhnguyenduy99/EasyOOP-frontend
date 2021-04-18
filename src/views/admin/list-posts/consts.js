export const POST_STATUSES = {
  NONE: {
    status: -1,
    title: "Chọn tất cả"
  },
  ACTIVE: {
    status: 0,
    title: "Đã duyệt",
    icon: "check",
    type: "is-success"
  },
  PENDING_CREATE: {
    status: 1,
    title: "Duyệt tạo",
    icon: "circle",
    type: "is-danger"
  },
  PENDING_UPDATE: {
    status: 2,
    title: "Duyệt cập nhật",
    icon: "circle",
    type: "is-danger"
  },
  PENDING_DELETE: {
    status: 3,
    title: "Duyệt xóa",
    icon: "circle",
    type: "is-danger"
  }
};
