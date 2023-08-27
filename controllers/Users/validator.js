module.exports = {
  createUser: {
    fullname: "required",
    phoneNumber: "required",
    username: "required",
  },
  updateUser: {
    fullname: "required",
    phoneNumber: "required|minLength:7|maxLength:15",
  },
};
