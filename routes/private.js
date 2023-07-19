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
  {
    path: "/recipe/my-recipe",
    controller: require("../controllers/Recipe").getMyRecipes,
    method: "get",
  },
];
