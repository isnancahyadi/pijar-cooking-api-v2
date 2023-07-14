const db = require("../config/db");

module.exports = {
  regAccount: async (payload) => {
    try {
      const query = db`INSERT INTO accounts ${db(
        { ...payload, role_id: 2 },
        "username",
        "email",
        "password",
        "role_id"
      )} returning username`;

      return query;
    } catch (error) {
      return;
    }
  },

  getEmailAccount: async (email) => {
    try {
      const query = db`SELECT * FROM accounts WHERE email = ${email}`;
      return query;
    } catch (error) {
      return;
    }
  },

  getUsernameAccount: async (username) => {
    try {
      const query = db`SELECT * FROM accounts WHERE username = ${username}`;
      return query;
    } catch (error) {
      return;
    }
  },

  checkAccount: async (user) => {
    try {
      const query =
        await db`SELECT * FROM accounts WHERE username = ${user} OR email = ${user}`;
      return query ? query : 1;
    } catch (error) {
      return 0;
    }
  },
};
