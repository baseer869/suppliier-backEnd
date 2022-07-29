const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("orders", {
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
    orderNumber: {
      type: Sequelize.STRING,
    },

    paymentId: {
      type: Sequelize.STRING,
    },

    orderDate: {
      type: Sequelize.DATE,
    },
    shipDate: {
      type: Sequelize.DATE,
    },
    salesTax: {
      type: Sequelize.INTEGER,
    },
    transactionStatus: {
      type: Sequelize.ENUM,
      values: ["waiting", "accepted", "onprogress", "rejected", "completed"],
    },
    status: {
      type: Sequelize.ENUM,
      values: ["0", "1"], // 0 for order not delived , 1 for delivred
    },
    paid: {
      type: Sequelize.ENUM,
      values: ["0", "1"],
    },
    margin: {
      type: Sequelize.INTEGER,
    },
    estimatedDeliveryDate:{
      type: Sequelize.DATE,
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
