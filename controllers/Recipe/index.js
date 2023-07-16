const model = require("../../models/recipeModel");
const response = require("../../utils/response");

module.exports = {
  getAllRecipes: async (req, res) => {
    try {
      const query = await model.getAllRecipes(req?.query?.limit);

      if (query) {
        response(200, "OK", "SUCCESS", query, res);
        return;
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },

  getNewRecipes: async (req, res) => {
    try {
      const query = await model.getNewRecipes(req?.query?.limit);

      if (query) {
        response(200, "OK", "Get all data success", query, res);
        return;
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },
};
