const { DataTypes, Sequelize } = require('sequelize');

module.exports = function (sequelize, Sequelizew) {

    const Model = sequelize.define('roles', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
       
        status: {
            type:  Sequelize.ENUM,
            values: ['0', '1'],
            defaultValues:'1'
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

