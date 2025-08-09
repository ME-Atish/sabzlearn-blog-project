const express = require("express");

const controller = require("../controllers/auth");
const registerScheme = require("../validators/register");
const captcha = require("../middlewares/captcha")
const loginScheme = require("../validators/login");
const validate = require("../middlewares/validate");
const passport = require("passport");

const router = express.Router();

router.route("/register").post(validate(registerScheme), controller.register);

router
  .route("/login")
  .post(
    validate(loginScheme),
    captcha,
    passport.authenticate("local", { session: false }),
    controller.login
  );

module.exports = router;
