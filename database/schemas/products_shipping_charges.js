const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("products_shippings_charges", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    is_shipping_charges: {
      type: Sequelize.ENUM,
      values: ["0", "1"], //0 for free shipping  1 for charges
    },
    charges: {
      type: DataTypes.NUMBER,
    },
    status: {
      type: Sequelize.ENUM,
      values: ["0", "1"], //0 for active  1 for inactive
    },
    productId: {
      type: Sequelize.BIGINT(20),
      references: {
        model: "products",
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
