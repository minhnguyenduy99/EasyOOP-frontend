export default {
  props: {
    verification: {
      verification_id: String,
      status: Number,
      post_id: String,
      author_id: String,
      post_title: Number,
      created_date: Number,
      custom_info: {
        type: Object,
        default: {}
      },
      manager_id: String,
      manager: Object,
      creator: Object
    }
  },
  computed: {
    managerName() {
      return this.verification?.manager?.alias ?? "Chưa có";
    },
    creatorName() {
      return this.verification?.creator?.alias;
    },
    createdDateInStr() {
      return new Date(this.verification?.created_date).toLocaleString("vi", {
        dateStyle: "full"
      });
    }
  }
};
