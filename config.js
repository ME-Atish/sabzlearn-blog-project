module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    poolSize: process.env.DB_POOL_SIZE || 30,
  },

  port: parseInt(process.env.PORT),
  auth: {
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    accessTokenExpireTimeInSecond: process.env.ACCESS_TOKEN_EXPIRE_IN_SECOND,
    refreshTokenExpireTimeInSecond: process.env.REFRESH_TOKEN_EXPIRE_IN_SECOND,

    google: {},
  },
  redis: {},
  domain: process.env.DOMAIN,
  isProduction: process.env.NODE_ENV === "production",
};
