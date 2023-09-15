const model = require("../../models/authModel");
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../../utils/response");

const saltRounds = 14;

const getToken = (req) => {
  const token = req?.headers?.authorization?.slice(6).trim();

  return token;
};

module.exports = {
  regAccount: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const mail = email.toLowerCase();
      const payload = { username, email: mail, password };

      const getEmailAccount = await model.getEmailAccount(mail);

      if (getEmailAccount) {
        if (getEmailAccount?.length) {
          response(
            409,
            "ERROR",
            { auth: { message: "Email already registered" } },
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

      const getUsernameAccount = await model.getUsernameAccount(username);

      if (getUsernameAccount) {
        if (getUsernameAccount?.length) {
          response(
            409,
            "ERROR",
            { auth: { message: "Account already registered" } },
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

      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const query = await model.regAccount({ ...payload, password: hash });

        if (query) {
          response(201, "OK", "Account has been created", query, res);
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
      });
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

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const checkAccount = await model.checkAccount(username);

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

      const checkUser = await userModel.findUser(checkAccount[0]?.username);

      bcrypt.compare(password, checkAccount[0]?.password, (err, result) => {
        if (result) {
          if (checkUser) {
            if (!checkUser?.length) {
              response(
                401,
                "ERROR",
                { auth: { message: "Profiles data not found" } },
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

          delete checkAccount[0].password;
          const token = jwt.sign(checkAccount[0], process.env.KEY);

          response(
            200,
            "OK",
            "Login success",
            { ...checkAccount[0], token },
            res
          );
          return;
        } else {
          response(
            403,
            "ERROR",
            { auth: { message: "Password invalid" } },
            null,
            res
          );
          return;
        }
      });
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

  updateAccount: async (req, res) => {
    try {
      const reqBody = req.body;

      const { username } = jwt.verify(getToken(req), process.env.KEY);
      const checkAccount = await model.checkAccount(username);

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

      const checkUsername = reqBody?.user
        ? await model.getUsernameAccount(reqBody?.user)
        : false;
      const checkEmail = reqBody?.email
        ? await model.getEmailAccount(reqBody?.email)
        : false;

      if (checkUsername || checkEmail) {
        if (checkUsername?.length > 0 || checkEmail?.length > 0) {
          response(
            409,
            "ERROR",
            { auth: { message: "Username or email has been registered" } },
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

      const payload = {
        username: reqBody?.user ?? checkAccount[0].username,
        email: reqBody?.email ?? checkAccount[0].email,
      };

      const query = await model.updateAccount(username, payload);

      if (query) {
        response(201, "OK", "Account has been updated", null, res);
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

  updatePassword: async (req, res) => {
    try {
      const { password } = req?.body;

      const { username } = jwt.verify(getToken(req), process.env.KEY);
      const checkAccount = await model.checkAccount(username);

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

      const passHash = await bcrypt.hash(password, saltRounds);

      const query = await model.updatePassword(username, {
        password: passHash,
      });

      if (query) {
        response(201, "OK", "Password has been update", null, res);
        return;
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
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
};
