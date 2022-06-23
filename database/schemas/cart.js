const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("carts", {
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
    productId: {
      type: DataTypes.BIGINT(20),
      references: {
        model: "products",
        key: "id",
      },
    },
    storeId: {
      type: DataTypes.BIGINT(20),
      references: {
        model: "store",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ['0', '1'],  // 0 for active 1 for inactive
      defaultValues: '0'  
    },
    active: {
      type: DataTypes.BOOLEAN, // if user
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
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
