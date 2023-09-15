module.exports = [
  {
    path: "/user",
    controller: require("../controllers/Users").getUser,
    method: "get",
  },
  {
    path: "/user",
    controller: require("../controllers/Users").updateUser,
    validator: require("../controllers/Users/validator").updateUser,
    method: "patch",
  },
  {
    path: "/user/photo",
    controller: require("../controllers/Users").updatePhotoUser,
    method: "patch",
  },
  {
    path: "/auth/account",
    controller: require("../controllers/Auth").updateAccount,
    method: "patch",
  },
  {
    path: "/auth/password",
    controller: require("../controllers/Auth").updatePassword,
    method: "patch",
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
  {
    path: "/recipe/:id",
    controller: require("../controllers/Recipe").deleteRecipe,
    method: "delete",
  },
  {
    path: "/recipe/:id",
    controller: require("../controllers/Recipe").updateRecipe,
    validator: require("../controllers/Recipe/validator").updateRecipe,
    method: "patch",
  },
  {
    path: "/recipe/image/:id",
    controller: require("../controllers/Recipe").updateImageRecipe,
    method: "patch",
  },
];
