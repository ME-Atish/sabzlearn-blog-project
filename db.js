const { Sequelize } = require("sequelize");

const config = require("./config");

const db = new Sequelize({
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  dialect: config.db.dialect,
  logging: config.isProduction ? false : console.log,
});

module.exports = db;
