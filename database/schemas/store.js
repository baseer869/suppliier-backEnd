const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("store", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: {
      type: Sequelize.BIGINT(20),
      references: {
        model: "shop_categories",
        key: "id",
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    attachement: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.FLOAT,
    },
    long: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: Sequelize.ENUM,
      values: ["0", "1"], //0 for close  1 for open
      defaultValues: "0",
    },
    verified: {
      type: Sequelize.ENUM,
      values: ["0", "1"], //0 not verified  1 verified
      defaultValues: "0",
    },
    createdAt: {
      field: "created_at",
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE,
    },
  });
  return Model;
};
