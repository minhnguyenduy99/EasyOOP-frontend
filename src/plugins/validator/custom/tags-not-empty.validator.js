export default {
  name: "tags-not-empty",
  rule: {
    params: ["tags"],
    validate(value, args) {
      const { tags } = args;
      return tags.length > 0;
    }
  }
};
