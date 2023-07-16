const db = require("../config/db");

module.exports = {
  getAllRecipes: async (limit) => {
    try {
      let query;
      if (limit) {
        query = await db`SELECT * FROM recipes LIMIT ${limit}`;
      } else {
        query = await db`SELECT * FROM recipes`;
      }
      return query;
    } catch (error) {
      return;
    }
  },

  getNewRecipes: async (limit) => {
    try {
      let query;
      if (limit) {
        query =
          await db`SELECT * FROM recipes ORDER BY created_at DESC LIMIT ${limit}`;
      } else {
        query = await db`SELECT * FROM recipes ORDER BY created_at DESC`;
      }
      return query;
    } catch (error) {
      return;
    }
  },
};
