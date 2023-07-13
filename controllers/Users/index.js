const model = require("../../models/userModel");
const response = require("../../utils/response");

module.exports = {
  createUser: async (req, res) => {
    const { fullname, phoneNumber, username } = req.body;

    try {
      const payLoad = {
        fullname,
        phone_number: phoneNumber,
        username,
      };

      const findUser = await model.findUser(username);

      if (findUser) {
        if (findUser?.length) {
          response(409, "ERROR", "User already registered", null, res);
          return;
        }
      } else {
        response(500, "ERROR", "WOW... Something wrong with server", null, res);
        return;
      }

      const query = await model.createUser(payLoad);

      if (query) {
        response(201, "OK", "User has been created", null, res);
        return;
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
