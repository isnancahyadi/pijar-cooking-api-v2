const db = require("../config/db");

module.exports = {
  createUser: async (payload) => {
    try {
      const query = await db`INSERT INTO users ${db(
        payload,
        "fullname",
        "phone_number",
        "username"
      )} returning id, profile_picture, username`;
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

  updateUser: async (payload, username) => {
    try {
      const query = await db`UPDATE users set ${db(
        payload,
        "fullname",
        "phone_number"
      )} WHERE username = ${username} returning id`;
      return query;
    } catch (error) {
      return;
    }
  },

  updatePhotoUser: async (payload, username) => {
    try {
      const query = await db`UPDATE users set ${db(
        payload,
        "profile_picture"
      )} WHERE username = ${username} returning id, profile_picture`;
      return query;
    } catch (error) {
      return;
    }
  },
};
