const db = require("../config/db");

module.exports = {
  createUser: async (payload) => {
    try {
      const query = await db`INSERT INTO users ${db(
        payload,
        "fullname",
        "phone_number",
        "username"
      )} returning id, profile_picture`;
      return query;
    } catch (error) {
      return;
    }
  },

  findUser: async (username) => {
    try {
      const query = db`SELECT * FROM users WHERE username = ${username}`;
      return query;
    } catch (error) {
      return;
    }
  },
};
