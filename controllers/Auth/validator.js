module.exports = {
  register: {
    username: "required",
    email: "required|email|maxLength:50",
    password: [
      "required",
      //   "regex:[/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%^&])/]",
      "minLength:8",
      "maxLength:32",
    ],
    rePassword: "required|same:password",
  },

  login: {
    username: "required",
    password: [
      "required",
      //   "regex:[/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%^&])/]",
      "minLength:8",
      "maxLength:32",
    ],
  },
};
