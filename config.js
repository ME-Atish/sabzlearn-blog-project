module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    poolSize: process.env.DB_POOL_SIZE || 30,
  },

  port: parseInt(process.env.PORT),
  auth: {
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    accessTokenExpireTimeInSecond: process.env.ACCESS_TOKEN_EXPIRE_IN_SECOND,
    refreshTokenExpireTimeInSecond: process.env.REFRESH_TOKEN_EXPIRE_IN_SECOND,

    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  redis: {
    uri: process.env.REDIS_URI,
  },
  domain: process.env.DOMAIN,
  isProduction: process.env.NODE_ENV === "production",
};
