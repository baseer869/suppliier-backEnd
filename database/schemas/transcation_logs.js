const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
    const Model = sequelize.define("transcation_logs", {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "orders",
                key: "id",
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            },
        },
        processed_by: {
            type: DataTypes.INTEGER,
        },
        amount: {
            type: DataTypes.FLOAT,
        },

        type: {
            type: DataTypes.ENUM,
            values: ["debit", "credit", "refund"],
            defaultValues: "0",
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
