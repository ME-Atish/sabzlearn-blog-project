const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../db");
const redis = require("../redis");
const config = require("../config");

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      config.auth.accessTokenSecretKey,
      {
        expiresIn: config.auth.accessTokenExpireTimeInSecond + "s",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      config.auth.refreshTokenSecretKey,
      {
        expiresIn: config.auth.refreshTokenExpireTimeInSecond + "s",
      }
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    await redis.set(
      `refreshToken: ${user.id}`,
      hashedRefreshToken,
      "EX",
      config.auth.refreshTokenExpireTimeInSecond
    );
    return res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    if (err) {
      return res.status(500).json(err);
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = req.user;

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      config.auth.accessTokenSecretKey,
      {
        expiresIn: config.auth.accessTokenExpireTimeInSecond + "s",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      config.auth.refreshTokenSecretKey,
      {
        expiresIn: config.auth.refreshTokenExpireTimeInSecond + "s",
      }
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    await redis.set(
      `refreshToken: ${user.id}`,
      hashedRefreshToken,
      "EX",
      config.auth.refreshTokenExpireTimeInSecond
    );
    return res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    if (err) {
      return res.status(500).json(err.errors);
    }
  }
};

exports.me = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    if (error) {
      return res.status(500).json(error);
    }
  }
};

exports.logout = async (req, res, next) => {
  try {
    const redisKey = `refreshToken${req.user.id}`;

    await redis.del(redisKey);

    res.status(204).json({});
  } catch (error) {
    if (error) {
      return res.status(500).json(error);
    }
  }
};
