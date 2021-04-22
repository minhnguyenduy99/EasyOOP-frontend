export const POST_STATUSES = [
  {
    status: -1,
    title: "Chọn tất cả"
  },
  {
    status: 1,
    title: "Duyệt tạo",
    icon: "circle",
    type: "is-danger"
  },
  {
    status: 2,
    title: "Duyệt cập nhật",
    icon: "circle",
    type: "is-danger"
  },
  {
    status: 3,
    title: "Duyệt xóa",
    icon: "circle",
    type: "is-danger"
  }
];

export const VERIFICATION_TYPES = [
  {
    text: "Chọn loại duyệt",
    value: null
  },
  {
    text: "Duyệt tạo",
    value: "1"
  },
  {
    text: "Duyệt cập nhật",
    value: "2"
  },
  {
    text: "Duyệt xóa",
    value: "3"
  }
];

export const VERIFICATION_STATUSES = [
  {
    text: "Không được duyệt",
    color: "has-text-danger"
  },
  {
    text: "Đã duyệt",
    color: "has-text-success"
  },
  {
    text: "Đang chờ",
    color: "has-text-primary-dark"
  },
  {
    text: "Đã hủy",
    color: "has-text-grey"
  }
];
