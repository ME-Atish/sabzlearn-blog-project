const express = require("express");

const controller = require("../controllers/auth");
const registerScheme = require("../validators/register");
const captcha = require("../middlewares/captcha");
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

router
  .route(".logout")
  .post(
    passport.authenticate("accessToken", { session: false }),
    controller.logout
  );

router
  .route("/me")
  .get(passport.authenticate("accessToken", { session: false }), controller.me);

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
  .route("/google/callback")
  .get(passport.authenticate("google", { session: false }), controller.login);

module.exports = router;
