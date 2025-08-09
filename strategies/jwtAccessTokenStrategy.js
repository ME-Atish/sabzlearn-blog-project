const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const configs = require("../config");
const { User } = require("../db");

module.exports = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configs.auth.accessTokenSecretKey,
  },
  async (payload, done) => {
    const user = await User.findByPk(payload.id, {
      raw: true,
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) return done(null, false);

    return done(null, user);
  }
);
