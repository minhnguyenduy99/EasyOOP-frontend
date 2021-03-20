const data = [
  {
    topic_title: "KHÁI NIỆM CƠ BẢN",
    topic_id: "605415e98efd76b77a1c0257",
    topic_description: "Bắt đầu học các khái niệm cơ bản trong OOP",
    first_post_id: "60477bbae82d0302c40ddc05"
  },
  {
    topic_title: "Nguyên tắc SOLID",
    topic_id: "605418e4aeafce2d127ef028",
    topic_description: "Học về các nguyên tắc thiết kế OOP",
    first_post_id: "605418e4aeafce2d127ef028"
  },
  {
    topic_title: "Design Pattern trong OOP",
    topic_id: "60541646a4f7e1289f8e43a0",
    topic_description: "Học về các mẫu thiết được sử dụng trong thiết kế OOP",
    first_post_id: null
  }
];

export default {
  async findTopics(search, limitOptions = {}) {
    return {
      data
    };
  }
};
