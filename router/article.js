const express = require("express");
const passport = require("passport");

const controller = require("../controllers/article");
const validate = require("../middlewares/validate");
const createArticleValidator = require("../validators/createArticle");
const uploader = require("../utils/multer");

const router = express.Router();

router
  .route("/")
  .post(
    passport.authenticate("accessToken", { session: false }),
    uploader.single("cover"),
    validate(createArticleValidator),
    controller.create
  );

router.route("/:slug").get(controller.findBySlug)

module.exports = router;
