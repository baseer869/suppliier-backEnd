const { DataTypes, Sequelize } = require('sequelize');

module.exports = function (sequelize, Sequelizew) {

    const Product = sequelize.define('categories', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        attachement: {
            type: DataTypes.STRING,
        },
        color: {
            type: DataTypes.STRING,
        },
        categoryType: {
            type: DataTypes.ENUM,
            values: ['Electronics Accessories', 'Electronic Devices'],
        },
        group_categories_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "group_categories",
                key: "id",
            },
        },
        status: {
            type: DataTypes.ENUM,
            values: ['0', '1'],  // 0 for inactive , 1 for active,
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
    },
    );
    return Product;
}

