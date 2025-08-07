const { Sequelize } = require("sequelize");

const config = require("./config");
const User = require("./models/User");
const TagsArticles = require("./models/TagsArticles");
const Tag = require("./models/Tag");
const Article = require("./models/Article");

const db = new Sequelize({
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  dialect: config.db.dialect,
  logging: config.isProduction ? false : console.log,
});

User.hasMany(Article, {
  foreignKey: "author_id",
  onDelete: "CASCADE ",
});

Article.belongsToMany(User, {
  foreignKey: "author_id",
  as: "author",
});

Article.belongsToMany(Tag, {
  through: TagsArticles,
  onDelete: "CASCADE",
  foreignKey: "article_id",
});

Tag.belongsToMany(Article, {
  through: TagsArticles,
  onDelete: "CASCADE",
  foreignKey: "tag_id",
});

module.exports = db;
