export default {
  data: () => ({
    VERIFICATION_STATUS_STYLES: {
      0: {
        type: "is-danger",
        text: "Không được duyệt"
      },
      1: {
        type: "is-success",
        text: "Đã duyệt"
      },
      2: {
        type: "is-primary",
        text: "Đang chờ"
      },
      3: {
        type: "is-light",
        text: "Đã hủy"
      }
    },
    VERIFICATION_TYPE_STYLES: {
      1: {
        type: "is-primary",
        text: "Duyệt tạo"
      },
      2: {
        type: "is-primary",
        text: "Duyệt cập nhật"
      },
      3: {
        type: "is-danger",
        text: "Duyệt xóa"
      }
    }
    // STATUS_BASED_ACTIONS: [
    //   {
    //     order: 0,
    //     icon: "eye",
    //     tooltip: "Xem trước",
    //     type: "is-primary",
    //     outlined: true,
    //     roles: ["creator", "manager"],
    //     statuses: [1, 2]
    //   },
    //   {
    //     order: 1,
    //     icon: "minus-circle",
    //     tooltip: "Hủy",
    //     type: "is-danger",
    //     outlined: false,
    //     roles: ["creator"],
    //     statuses: [2]
    //   },
    //   {
    //     order: 2,
    //     icon: "check",
    //     tooltip: "Duyệt",
    //     type: "is-success",
    //     outlined: false,
    //     roles: ["manager"],
    //     statuses: [2]
    //   },
    //   {
    //     order: 3,
    //     icon: "ban",
    //     tooltip: "Không duyệt",
    //     type: "is-danger",
    //     outlined: false,
    //     roles: ["manager"],
    //     statuses: [2]
    //   }
    // ]
  })
};
