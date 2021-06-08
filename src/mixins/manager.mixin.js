export default {
  props: {
    manager: Object
  },
  computed: {
    loginStatus() {
      return this.manager.login_status === 1 ? "Hoạt động" : "Không hoạt động";
    },
    loginStatusColor() {
      return this.manager.login_status === 1 ? "green" : "red";
    },
    avatar() {
      return this.manager?.profile?.profile_pic;
    },
    joinDate() {
      return new Date(this.manager?.created_date).toLocaleDateString("en-GB");
    }
  }
};
