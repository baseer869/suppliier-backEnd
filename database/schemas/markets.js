const { DataTypes, Sequelize } = require('sequelize');

module.exports = function( sequelize, Sequelizew ) {

const Model = sequelize.define('markets', {
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
    attachment:{
        type: DataTypes.STRING,
    },
    latitude:{
    type: DataTypes.FLOAT,
    },
    longitude:{
        type: DataTypes.FLOAT,
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

