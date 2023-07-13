const db = require("../config/db");

module.exports = {
  getAllRecipes: async () => {
    try {
      const query = await db`SELECT * FROM recipes`;
      return query;
    } catch (error) {
      return;
    }
  },
};
