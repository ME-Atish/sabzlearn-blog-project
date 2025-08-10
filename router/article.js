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
  ).get(controller.getAll);

router.route("/:slug").get(controller.findBySlug)

router.route("/:id").delete(passport.authenticate("accessToken", {session: false }), controller.delete)

module.exports = router;
