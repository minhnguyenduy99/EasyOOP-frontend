export default {
  props: {
    title: String,
    topics: {
      type: Array,
      default: () => [],
      required: false
    }
  }
};
