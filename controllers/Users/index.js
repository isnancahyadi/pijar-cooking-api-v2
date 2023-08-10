const model = require("../../models/userModel");
const accountModel = require("../../models/authModel");
const response = require("../../utils/response");
const jwt = require("jsonwebtoken");

const getToken = (req) => {
  const token = req?.headers?.authorization?.slice(6).trim();

  return token;
};

module.exports = {
  createUser: async (req, res) => {
    const { fullname, phoneNumber, username } = req.body;

    try {
      const findUser = await model.findUser(username);

      if (findUser) {
        if (findUser?.length) {
          response(
            409,
            "ERROR",
            { auth: { message: "User already registered" } },
            null,
            res
          );
          return;
        }
      } else {
        response(
          500,
          "ERROR",
          { auth: { message: "WOW... Something wrong with server" } },
          null,
          res
        );
        return;
      }

      const checkAccount = await accountModel.checkAccount(username);

      if (checkAccount) {
        if (!checkAccount?.length || checkAccount === 1) {
          response(
            404,
            "ERROR",
            { auth: { message: "Account not found" } },
            null,
            res
          );
          return;
        }
      } else {
        response(
          500,
          "ERROR",
          { auth: { message: "WOW... Something wrong with server" } },
          null,
          res
        );
        return;
      }

      const payLoad = {
        fullname,
        phone_number: phoneNumber,
        username: checkAccount[0]?.username,
      };

      const query = await model.createUser(payLoad);

      if (query) {
        response(201, "OK", "User has been created", query, res);
        return;
      } else {
        response(
          500,
          "ERROR",
          { auth: { message: "WOW... Something wrong with server" } },
          null,
          res
        );
        return;
      }
    } catch (error) {
      response(
        400,
        "ERROR",
        { auth: { message: "Awww... Something wrong..." } },
        null,
        res
      );
      return;
    }
  },

  getUser: async (req, res) => {
    try {
      const { username } = jwt.verify(getToken(req), process.env.KEY);
      const query = await model.findUser(username);

      if (query) {
        if (!query?.length) {
          response(404, "ERROR", "Hey, Who are you?", null, res);
          return;
        } else {
          response(200, "OK", "Get data success", query, res);
          return;
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }
    } catch (error) {
      response(400, "ERROR", "Awww... Something wrong...", null, res);
      return;
    }
  },
};
