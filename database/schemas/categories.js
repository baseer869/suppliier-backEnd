const { DataTypes, Sequelize } = require('sequelize');

module.exports = function( sequelize, Sequelizew ) {

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
    attachement:{
        type: DataTypes.STRING,
    },
    color:{
        type: DataTypes.STRING,
    },
    categoryType :{
      type : DataTypes.ENUM,
      values:['Electronics Accessories', 'Electronic Devices' ],
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

