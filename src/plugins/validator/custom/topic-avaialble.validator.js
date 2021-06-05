export default {
  name: "topic-available",
  rule: {
    params: ["topic"],
    validate(value, args) {
      const {
        topic: { is_available }
      } = args;
      return is_available;
    }
  }
};
