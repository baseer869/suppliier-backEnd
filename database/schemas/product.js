const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("products", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    originalPrice: {
      type: DataTypes.FLOAT,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    attachment: {
      type: DataTypes.STRING,
    },
    moq: {
      type: DataTypes.FLOAT,
    },
    productType:{
      type: DataTypes.ENUM,
      values:['normal', 'sale', 'offer', 'groupBuy', 'launchingSoon', 'zotoChoice'],
      defaultValues: "normal",
    },
    status: {
      type: DataTypes.ENUM,
      values: ["0", "1", "2"], // 0 for regular product 1 for arrival 3 for recommended
      defaultValues: "0",
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    longDescription: {
      type: DataTypes.STRING,
    },

    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
    saleBanner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "app_advertisements",
        key: "id",
      },
    },
    store_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "store",
        key: "id",
      },
    },
    isAvailable: {
      type: Sequelize.BOOLEAN,
      defaultValues: true,
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
