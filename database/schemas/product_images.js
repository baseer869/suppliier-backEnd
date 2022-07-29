const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("product_images", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: Sequelize.BIGINT(20),
      references: {
        model: "products",
        key: "id",
      },
    },
    images:{
        type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM,
      values: ["0", "1"], 
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
