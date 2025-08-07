const TagsArticles = (sequelize) =>
  sequelize.db(
    "tags_articles",
    {},
    {
      timestamps: false,
      tableName: "tags_articles",
    }
  );

module.exports = TagsArticles;
