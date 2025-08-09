const { DataTypes } = require("sequelize");

const Tag = (sequelize) =>
  sequelize.define(
    "tag",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "tags",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false, 
    }
  );

module.exports = Tag;
