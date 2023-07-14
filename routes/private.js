module.exports = [
  {
    path: "/user",
    controller: require("../controllers/Users").getUser,
    method: "get",
  },
];
