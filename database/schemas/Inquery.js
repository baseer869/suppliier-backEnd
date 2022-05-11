const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Inquery = sequelize.define("inqueries", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    description:{
     type: Sequelize.STRING,
    },
    productId: {
      type: DataTypes.BIGINT(20),
      references: {
        model: "products",
        key: "id",
      },
    },
    status:{
        type: Sequelize.ENUM,
        values: ['pending', 'accepted'], 
        defaultValues: 'pending'
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
  return Inquery;
};
