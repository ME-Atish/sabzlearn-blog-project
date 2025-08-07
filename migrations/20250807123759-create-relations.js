"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn("articles", "author_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.createTable("tags_articles", {
        article_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "articles",
            key: "id",
          },
          onDelete: "cascade",
        },
        tag_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "tags",
            key: "id",
          },
          onDelete: "CASCADE",
        },
      });

      await queryInterface.addConstraint("tags_articles", {
        fields: ["article_id", "teg_id"],
        type: "unique",
        name: "unique_article",
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn("articles", "author_id");
      await queryInterface.dropTable("tags_articles");
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

    await queryInterface.dropTable("relations");
  },
};
