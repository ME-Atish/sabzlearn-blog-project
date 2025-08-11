const GoogleStrategy = require("passport-google-oauth20");
const { default: slugify } = require("slugify");

const config = require("../config");
const { User } = require("../db");

module.exports = new GoogleStrategy(
  {
    clientID: config.auth.google.clientId,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: `${config.domain}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;

    let user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return done(null, user);
    }

    const name = `${profile.name.givenName} ${profile.name.familyName}`;
    const username =
      slugify(name, { lower: true }).replace(/[\.-]/g, "") +
      Math.floor(1000 + Math.random() * 9000);

    const newUser = await User.create({
      name,
      avatar: profile.photos[0].value,
      username,
      email,
      provider: "google",
    });

    done(null, newUser);
  }
);
