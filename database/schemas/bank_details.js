const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
    const Model = sequelize.define("bank_details", {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        account_name: {
            type: DataTypes.STRING,
            defaultValues: null
        },
        account_number: {
            type: DataTypes.STRING,
            defaultValues: null
        },
        bank_name: {
            type: DataTypes.STRING,
            defaultValues: null
        },
        account_benefciary_name: {
            type: DataTypes.STRING,
            defaultValues: null
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
