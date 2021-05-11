export default {
  props: {
    creator: Object
  },
  computed: {
    loginStatus() {
      return this.creator.login_status === 1 ? "Hoạt động" : "Không hoạt động";
    },
    loginStatusColor() {
      return this.creator.login_status === 1 ? "green" : "red";
    },
    avatar() {
      return this.creator?.profile?.profile_pic;
    },
    joinDate() {
      return new Date(this.creator?.created_date).toLocaleDateString("en-GB");
    }
  }
};
