export default type => ({
  props: {
    template: {
      title: String,
      tag: String,
      class: String,
      template_data: Array
    }
  },
  methods: {
    $buildTemplate() {
      return {
        type,
        ...this.template
      };
    }
  }
});
