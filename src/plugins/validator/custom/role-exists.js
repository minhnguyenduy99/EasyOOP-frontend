export default {
  name: "roleAssignable",
  rule: {
    params: ["user", "role"],
    validate(value, args) {
      const { user, role } = args;
      return (
        !user || (user.user_id === value && user?.roles.indexOf(role) === -1)
      );
    }
  }
};
