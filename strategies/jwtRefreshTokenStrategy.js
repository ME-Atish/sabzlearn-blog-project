const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcrypt");

const configs = require("../config");
const { User } = require("../db");
const redis = require("../redis");

module.exports = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configs.auth.refreshTokenSecretKey,
    passReqToCallback: true,
  },
  async (req, payload, done) => {
    const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const user = await User.findByPk(payload.id, {
      raw: true,
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return done(null, false);
    }
    const hashedRefreshToken = await redis.get(`refreshToken:${user.id}`);

    if (!hashedRefreshToken) {
      return done(null, false);
    }

    const isRefreshToken = await bcrypt.compare(
      refreshToken,
      hashedRefreshToken
    );

    if (!isRefreshToken) {
      return done(null, false);
    }

    done(null, user);
  }
);
