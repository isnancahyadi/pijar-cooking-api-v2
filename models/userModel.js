const db = require("../config/db");

module.exports = {
  createUser: async (payload) => {
    try {
      await db`INSERT INTO users ${db(
        payload,
        "fullname",
        "phone_number",
        "username"
      )}`;
      return true;
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
