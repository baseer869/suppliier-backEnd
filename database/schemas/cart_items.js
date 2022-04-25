const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("cart_items", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      defaultValues:0
    },
    quantity:{
      type: DataTypes.INTEGER,
    },
      cartId: {
      type: DataTypes.INTEGER,
      references: {
        model: "carts",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.BIGINT(20),
      references: {
        model: "products",
        key: "id",
      },
    },
    shopId: {
      type: DataTypes.BIGINT(20),
      references: {
        model: "shop",
        key: "id",
      },
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
