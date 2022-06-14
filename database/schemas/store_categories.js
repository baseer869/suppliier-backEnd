const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("store_categories", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    status: {
      type: Sequelize.ENUM,
      values: ["0", "1"], //0 for close  1 for open
      defaultValues: "0",
    },
    attachement: {
      type: DataTypes.STRING,
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
