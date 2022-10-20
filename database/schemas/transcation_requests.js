const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
    const Model = sequelize.define("transcation_requests", {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
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
        debitAmount: {
            type: DataTypes.FLOAT,
        },

        type: {
            type: DataTypes.ENUM,
            values: ["debit", ],
        },
        status: {
            type: DataTypes.ENUM,
            values: ["Pending",  "Processing", "Rejected", "Completed"],
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
