export default {
  name: "tag-unique",
  rule: {
    params: ["tags"],
    validate(value, args) {
      const { tags = [] } = args;
      return tags.findIndex(tag => tag?.tag_id === value) === -1;
    }
  }
};
