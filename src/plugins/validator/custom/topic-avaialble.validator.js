export default {
  name: "topic-available",
  rule: {
    params: ["topic"],
    validate(value, args) {
      const {
        topic: { topic_id, is_available }
      } = args;
      return value === topic_id && is_available;
    }
  }
};
