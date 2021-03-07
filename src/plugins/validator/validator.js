import { required as _r, email as _email } from "vee-validate/dist/rules";

export default {
  email: {
    ..._email,
    message: "{_field_} is invalid"
  },
  required: {
    ..._r,
    message: "{_field_} is required"
  },
  minmax: {
    validate: (val, { min, max }) => {
      if (!val) return true;
      if (val.length >= min && val.length <= max) {
        return true;
      }
      return false;
    },
    params: ["min", "max"],
    message: "The length of {_field_} must be from {min} to {max} characters"
  },
  passwordmatch: {
    params: ["target"],
    validate(value, { target }) {
      return value === target;
    },
    message: "Password does not match"
  }
};
