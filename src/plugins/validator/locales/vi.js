import vi from "vee-validate/dist/locale/vi.json";

export default {
  locale: "vi_VN",
  messages: {
    ...vi.messages,
    required: "Bắt buộc phải có {_field_}",
    "topic-available": "Chủ đề này có bài viết đang được chờ duyệt",
    min: "Độ dài của {_field_} phải từ {length} ký tự trở lên",
    minmax: "Độ dài của {_field_} phải từ {min} đến {max} ký tự",
    min_value: "Gía trị tối thiểu của {_field_} phải là {min}"
  },
  names: {
    post_title: "tiêu đề",
    tag: "nhãn dán",
    thumbnail: "ảnh bìa",
    userid: "ID người dùng",
    alias: "biệt danh",
    tags: "nhãn dán",
    question: "câu hỏi",
    answer: "câu trả lời",
    username: "tên người dùng",
    password: "mật khẩu",
    // test module
    topic_id: "chủ đề",
    title: "tiêu đề",
    default_score_per_sentence: "điểm số mặc định",
    option: "lựa chọn",
    score: "điểm số"
  },
  serverSide: {
    messages: {
      Authentication: {
        InvalidAuthInfo: "Tên đăng nhập hoặc mật khẩu không chính xác",
        DuplicateInfo: "Tên người dùng hoặc email đã tồn tại"
      },
      RoleManagement: {
        RoleNotFound: "Không tìm thấy người dùng với vị trí này",
        InvalidUser: "ID của người dùng không hợp lệ",
        InvalidRoleType: "Giá trị của vai trò không hợp lệ",
        RoleHasBeenAssigned: "Người dùng đã có vai trò này",
        UserNotFound: "Không tìm thấy người dùng",
        ServiceErrors: "Lỗi hệ thống"
      }
    }
  }
};
