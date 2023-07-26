module.exports = {
  createRecipe: {
    title: "required",
    ingredients: "required",
    video: "required|url",
    direction: "required",
    category: "required",
    description: "required",
  },

  updateRecipe: {
    video: "url",
  },
};
