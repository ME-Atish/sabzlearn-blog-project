const express = require("express");
const controller = require("../controllers/auth");
const registerScheme = require("../validators/register");
const validate = require("../middlewares/validate");

const router = express.Router();

router.route("/register").post(validate(registerScheme), controller.register);

module.exports = router;
