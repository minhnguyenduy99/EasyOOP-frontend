export default {
  name: "passwordmatch",
  rule: {
    params: ["target"],
    validate(value, { target }) {
      return value === target;
    }
  }
};
