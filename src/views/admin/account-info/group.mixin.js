export default {
  props: {
    data: {
      type: Object,
      defaut: () => {}
    }
  },
  data: () => ({
    form: {}
  }),
  computed: {
    validator() {
      return this.$refs.validator;
    },
    isDataChanged() {
      for (let field in this.form) {
        if (this.data[field] !== this.form[field]) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    async $on_submittedForm() {
      const isFormValid = await this.validator.validate();
      if (!isFormValid) {
        return;
      }
      this.validator.reset();
      this.$emit("submitted", { validator: this.validator, form: this.form });
    }
  }
};
