const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
    const Model = sequelize.define("recent_searches", {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['0', '1'],
            defaultValues: "1",
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "products",
                key: "id",
            },
        },
        deviceId: {
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
        deletedAt: {
            type: Sequelize.DATE,
            field: "deleted_at",
        }
    });
    return Model;
};
