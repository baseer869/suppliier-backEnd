const { DataTypes, Sequelize } = require('sequelize');

module.exports = function (sequelize, Sequelizew) {

    const Model = sequelize.define('products', {
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
        price: {
            type: DataTypes.FLOAT,
        },
        attachment: {
            type: DataTypes.STRING,
        },
        stock: {
            type: DataTypes.INTEGER,
        },
        longDesc: {
            type: DataTypes.STRING
        },
        storeChoice:{
            type:  Sequelize.ENUM,
            values: ['0', '1'],
            defaultValues:'0'
        },
        shop_id: {
            type: DataTypes.BIGINT(20),
            references: {
                model: "shops",
                key: "id"
            },
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "categories",
                key: "id"
            },
        },
        unitType:{
            type: Sequelize.STRING,    
        },
        discountedPrice:{
            type: Sequelize.FLOAT,
            defaultValues:0.0
        },
        isAvailable :{
           type: Sequelize.BOOLEAN,
           defaultValues: true,
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
    return Model;
}

