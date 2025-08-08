const TagsArticles = (sequelize) =>
  sequelize.define(
    "tags_articles",
    {},
    {
      timestamps: false,
      tableName: "tags_articles",
    }
  );

module.exports = TagsArticles;
