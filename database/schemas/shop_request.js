const { DataTypes, Sequelize } = require('sequelize');

module.exports = function (sequelize, Sequelizew) {

    const Model = sequelize.define('shop_requests', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.INTEGER,
        },
        shop_name: {
            type: DataTypes.STRING,
        },
        status: {
            type:  Sequelize.ENUM,
            values: ['pending', 'onReview', 'accepted', 'rejected'],
            defaultValues:'pending'
        },
        createdAt: {
            field: "created_at",
            type: Sequelize.DATE,
          },
          updatedAt: {
            field: "updated_at",
            type: Sequelize.DATE,
          }, 
    }
    );
    return Model;
}

