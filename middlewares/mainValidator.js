const { Validator } = require("node-input-validator");
const response = require("../utils/response");

const valid = (req, res, next, result) => {
  if (result.validator) {
    const rules = new Validator(req.body, result.validator);

    rules.check().then((matched) => {
      if (!matched) {
        response(422, "ERROR", rules.errors, null, res);
      } else {
        return next();
      }
    });
  } else {
    return next();
  }
};

module.exports = valid;
