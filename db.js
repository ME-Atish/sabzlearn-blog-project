const { Sequelize } = require("sequelize");
const config = require("./config");

const db = new Sequelize({
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  dialect: config.db.dialect,
  logging: false,
});

/**@type {import("sequelize").ModelCtor<import("sequelize").Model<any , any>} */
const User = require("./models/User")(db);
/**@type {import("sequelize").ModelCtor<import("sequelize").Model<any , any>} */
const TagsArticles = require("./models/TagsArticles")(db);
/**@type {import("sequelize").ModelCtor<import("sequelize").Model<any , any>} */
const Tag = require("./models/Tag")(db);
/**@type {import("sequelize").ModelCtor<import("sequelize").Model<any , any>} */
const Article = require("./models/Article")(db);

User.hasMany(Article, {
  foreignKey: "author_id",
  onDelete: "CASCADE ",
});

Article.belongsTo(User, {
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


module.exports = { db, User, Article, Tag };
