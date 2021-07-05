export default {
  name: "is-image",
  rule: {
    validate: val => {
      const validTypes = ["image/png", "image/jpeg"];
      return val?.type && validTypes.indexOf(val?.type) !== -1;
    }
  }
};
