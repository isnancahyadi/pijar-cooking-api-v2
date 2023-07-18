const db = require("../config/db");

module.exports = {
  getAllRecipes: async (search, limit) => {
    let query;
    let keyword = `%${search}%`;

    try {
      if (search && limit) {
        query =
          await db`SELECT * FROM recipes WHERE LOWER(title) LIKE LOWER(${keyword}) LIMIT ${limit}`;
      } else if (search) {
        query =
          await db`SELECT * FROM recipes WHERE LOWER(title) LIKE LOWER(${keyword})`;
      } else if (limit) {
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
