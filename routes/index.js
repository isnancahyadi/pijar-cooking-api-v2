const router = require("express").Router();
const public = require("./public");

const validator = require("../middlewares/mainValidator");

let public_get = public.filter((res) => res.method === "get");
let public_post = public.filter((res) => res.method === "post");

public_get.map((result) => {
  router.get(result.path, result.controller);
});

public_post.map((result) => {
  router.post(
    result.path,
    function (req, res, next) {
      validator(req, res, next, result);
    },
    function (req, res, next) {
      if (result?.middleware) {
        result?.middleware(req, res, next, result);
      } else {
        next();
      }
    },
    result.controller
  );
});

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.send("Hello World");
// });

module.exports = router;
