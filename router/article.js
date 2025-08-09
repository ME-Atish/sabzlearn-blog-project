const express = require("express");

const controller = require("../controllers/article");
const validate = require("../middlewares/validate");
const createArticleValidator = require("../validators/createArticle");

const router = express.Router();

router.route("/").post(validate(createArticleValidator), controller.create);

module.exports = router;
