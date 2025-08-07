const { DataTypes } = require("sequelize");

const Tag = (sequelize) =>
  sequelize.define(
    "tag",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "tags",
    }
  );

module.exports = Tag;
