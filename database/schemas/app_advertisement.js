const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("app_advertisements", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    attachement: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
      defaultValues: "0",
    },
    // 
    banner_type: {
      type: Sequelize.ENUM,
      values: ['sale','advertisements','offer','super deals','new'],
    },
    coupen_code: {
      type: DataTypes.STRING,
    },
    total_off: {
      type: DataTypes.FLOAT,
    },
    store_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "store",
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
    deleted_at: {
      type: Sequelize.DATE,
    },
  });
  return Model;
};
