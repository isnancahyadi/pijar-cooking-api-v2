const jwt = require("jsonwebtoken");
const response = require("../utils/response");

const authMiddleware = (req, res, next) => {
  try {
    const header = req?.headers?.authorization;

    if (typeof header !== "undefined") {
      jwt.verify(header.slice(6).trim(), process.env.KEY, function (err) {
        if (err) {
          response(401, "ERROR", "Hey, Who are you?", null, res);
          return;
        } else {
          next();
        }
      });
    } else {
      response(403, "ERROR", "Access denied!!!", null, res);
      return;
    }
  } catch (error) {
    response(401, "ERROR", error.message, null, res);
    return;
  }
};

module.exports = authMiddleware;
