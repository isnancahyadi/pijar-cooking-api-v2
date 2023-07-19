const router = require("express").Router();
const private = require("./private");
const public = require("./public");

const validator = require("../middlewares/mainValidator");
const authMiddleware = require("../middlewares/authToken");

let private_get = private.filter((res) => res.method === "get");
let private_post = private.filter((res) => res.method === "post");

let public_get = public.filter((res) => res.method === "get");
let public_post = public.filter((res) => res.method === "post");

private_get.map((result) => {
  router.get(result.path, authMiddleware, result.controller);
});
private_post.map((result) => {
  router.post(
    result.path,
    authMiddleware,
    function (req, res, next) {
      validator(req, res, next, result);
    },
    result.controller
  );
});

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
