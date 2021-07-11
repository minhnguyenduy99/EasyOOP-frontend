export default {
  data: () => ({
    page: 1,
    totalCount: 0,
    verifications: [],
    itemsPerPage: 6,
    sorter: {
      sort_by: "created_date",
      order: -1
    },
    selectedVerification: null
  }),
  watch: {
    selectedVerification(val) {
      this.$emit("selected", val);
    },
    verifications: function() {
      this.selectedVerification = null;
    }
  },
  computed: {
    selectedVerificationId() {
      return this.selectedVerification?.verification_id;
    },
    isRowSelected() {
      return this.selectedVerification !== null;
    },
    isTableEmpty() {
      return this.verifications.length === 0;
    }
  },
  methods: {
    $m_updateTableData(totalCount, results) {
      this.totalCount = totalCount;
      this.verifications.length = 0;
      this.verifications.push(
        ...results.map((result, index) => {
          result.id = index + 1;
          return result;
        })
      );
    },
    $m_removeVerificationFromTable(verificationId) {
      this.verifications = this.verifications.filter(
        ver => ver.verification_id !== verificationId
      );
      this.totalCount--;
    }
  }
};
