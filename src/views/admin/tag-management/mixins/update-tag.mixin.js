export default ({ mapActions }) => ({
  methods: {
    ...mapActions("TAG", ["updateTag"]),

    $m_updateTag(tag, form) {
      const { tag_id, tag_type } = tag;
      return this.updateTag({ tag_id, tag_type, tag: form });
    }
  }
});
