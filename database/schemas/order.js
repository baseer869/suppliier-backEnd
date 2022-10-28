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
    reason: {
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
      values: ["Pending",
        "Awaiting_Payment",
        "Awaiting_Pullfiment",
        "Awaiting_Shipment",
        "Awaiting_Pickup",
        "Partially_Shipped"
        , "Completed", "Shipped"
        , "Cancelled", "Declined"
        , 'Refunded', 'Disputed',
        'Manual_Verification_Required',
        'Partially_Refunded'],
    },
    status: {
      type: Sequelize.ENUM,
      values: ["0", "1"], // 0 for order not delived , 1 for delivred
    },
    reviewStatus: {
      type: Sequelize.ENUM,
      values: ["0", "1"],
    },
    paid: {
      type: Sequelize.ENUM,
      values: ["0", "1"],
    },
    margin: {
      type: Sequelize.INTEGER,
    },
    estimatedDeliveryDate: {
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
  Model.prototype.toJSON = function () {
    let attributes = Object.assign({}, this.get());
    // delete attributes.status;
    if (attributes.paid == '1') {
      attributes.paid = "Yes";
    } else if (attributes.paid == "0") {
      attributes.paid = "No";
    } 
    return attributes;
  };
  return Model;
};
