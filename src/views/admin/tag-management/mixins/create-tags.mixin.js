export default ({ mapActions }) => ({
  methods: {
    ...mapActions("TAG", ["createTags"]),

    $m_createTags(form) {
      return this.createTags(form);
    }
  }
});
