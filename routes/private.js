module.exports = [
  {
    path: "/user",
    controller: require("../controllers/Users").getUser,
    method: "get",
  },
  {
    path: "/recipe",
    controller: require("../controllers/Recipe").createRecipe,
    validator: require("../controllers/Recipe/validator").createRecipe,
    method: "post",
  },
];
