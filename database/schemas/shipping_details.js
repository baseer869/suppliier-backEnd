const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("shipping_details", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.BIGINT(20),
      references: {
        model: "users",
        key: "id",
      },
    },
    orderId: {
      type: Sequelize.BIGINT(20),
      references: {
        model: "orders",
        key: "id",
      },
    },
    customer_name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    default: {
      type: Sequelize.ENUM,
      values: ["0", "1",],
      defaultValue: "1",
    },
    phone: {
      type: Sequelize.INTEGER,
    },
    state: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING
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
