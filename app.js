const express = require("express");
const cors = require("cors");
const passport = require("passport");
const fs = require("fs");
const path = require("path");

const localStrategy = require("./strategies/localStrategy")
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

app.use("/captcha", captchaController.get);
app.use("/auth", authRouter);
app.use("/article", articleRouter);

module.exports = app;
