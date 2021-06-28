export default ({ mapActions }) => ({
  methods: {
    ...mapActions("TAG", ["deleteTag"]),

    $m_deleteTag(tag) {
      return this.deleteTag(tag);
    }
  }
});
