const express = require("express");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

const localStrategy = require("./strategies/localStrategy");
const JwtAccessTokenStrategy = require("./strategies/jwtAccessTokenStrategy");
const JwtRefreshTokenStrategy = require("./strategies/jwtRefreshTokenStrategy");
const googleStrategy = require("./strategies/googleStrategy");
const captchaController = require("./controllers/captcha");
const authRouter = require("./router/auth");
const articleRouter = require("./router/article");

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

passport.use(localStrategy);
passport.use(googleStrategy);
passport.use("accessToken", JwtAccessTokenStrategy);
passport.use("refreshToken", JwtRefreshTokenStrategy);

app.get("/", (req, res) => {
  res.render("login.ejs");
});
app.use("/captcha", captchaController.get);
app.use("/auth", authRouter);
app.use("/article", articleRouter);

module.exports = app;
