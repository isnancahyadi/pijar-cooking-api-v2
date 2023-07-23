const db = require("../config/db");

module.exports = {
  getAllRecipes: async (search) => {
    let query;
    let keyword = `%${search}%`;

    try {
      if (search) {
        query =
          await db`SELECT * FROM recipes WHERE LOWER(title) LIKE LOWER(${keyword})`;
      } else {
        query = await db`SELECT * FROM recipes`;
      }

      return query;
    } catch (error) {
      return;
    }
  },

  getNewRecipes: async () => {
    try {
      const query = await db`SELECT * FROM recipes ORDER BY created_at DESC`;

      return query;
    } catch (error) {
      return;
    }
  },

  getMyRecipes: async (username) => {
    try {
      const query =
        await db`SELECT * FROM recipes WHERE created_by = ${username}`;

      return query;
    } catch (error) {
      return;
    }
  },

  getSpecifiedRecipe: async (id) => {
    try {
      const query = await db`SELECT * FROM recipes WHERE id = ${id}`;
      return query;
    } catch (error) {
      return;
    }
  },

  getCategory: async () => {
    try {
      const query = await db`SELECT * FROM category`;
      return query;
    } catch (error) {
      return;
    }
  },

  getRecipesByCategory: async (slug) => {
    try {
      const query =
        await db`SELECT recipes.title, recipes.ingredients, recipes.image, recipes.video, recipes.direction, recipes.created_by, recipes.liked, category.name AS category_name FROM recipes JOIN category ON recipes.category = category.id WHERE category.slug = ${slug}`;
      return query;
    } catch (error) {
      return;
    }
  },

  createRecipe: async (payload) => {
    try {
      await db`INSERT INTO recipes ${db(
        payload,
        "title",
        "ingredients",
        "image",
        "video",
        "direction",
        "created_by"
      )}`;
      return true;
    } catch (error) {
      return;
    }
  },

  deleteRecipe: async (id) => {
    try {
      await db`DELETE FROM recipes WHERE id = ${id}`;
      return true;
    } catch (error) {
      return;
    }
  },

  updateRecipe: async (id, username, payload) => {
    try {
      await db`UPDATE recipes set ${db(
        payload,
        "title",
        "ingredients",
        "video",
        "direction"
      )} WHERE id = ${id} AND created_by = ${username}`;
      return true;
    } catch (error) {
      return;
    }
  },

  updateImageRecipe: async (id, username, payload) => {
    try {
      await db`UPDATE recipes set ${db(
        payload,
        "image"
      )} WHERE id = ${id} AND created_by = ${username}`;
      return true;
    } catch (error) {
      return;
    }
  },
};
