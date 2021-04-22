import { VERIFICATION_STATUSES } from "../consts";

export default {
  props: {
    verification: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    createdDateInStr() {
      return new Date(this.verification?.created_date).toLocaleString("en-US");
    },
    customInfo() {
      return this.verification.custom_info ?? {};
    },
    status() {
      return VERIFICATION_STATUSES[this.verification.status];
    },
    isPending() {
      return this.verification.status === 2;
    },
    managerName() {
      return this.verification.manager_name ?? "Chưa có";
    }
  }
};
