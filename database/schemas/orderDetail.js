const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("orderDetail", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: Sequelize.BIGINT(20),
      references: {
        model: "orders",
        key: "id",
      },
    },
    productId: {
      type: Sequelize.BIGINT(20),
      references: {
        model: "products",
        key: "id",
      },
    },
    orderNumber: {
      type: DataTypes.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    discount: {
      type: Sequelize.INTEGER,
    },
    total: {
      type: Sequelize.INTEGER,
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
