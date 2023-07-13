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
};
