const express = require("express");
const passport = require("passport");

const controller = require("../controllers/article");
const validate = require("../middlewares/validate");
const createArticleValidator = require("../validators/createArticle");

const router = express.Router();

router
  .route("/")
  .post(
    validate(createArticleValidator),
    passport.authenticate("accessToken", { session: false }),
    controller.create
  );

module.exports = router;
