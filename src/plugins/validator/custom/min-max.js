export default {
  name: "minmax",
  rule: {
    validate: (val, { min, max }) => {
      if (!val) return true;
      if (val.length >= min && val.length <= max) {
        return true;
      }
      return false;
    },
    params: ["min", "max"]
  }
};
