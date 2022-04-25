const { DataTypes, Sequelize } = require('sequelize');

module.exports = function( sequelize, Sequelizew ) {

const Model = sequelize.define('shop_and_categories', {
    id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    category_id:{
        type: Sequelize.BIGINT(20),
        references: {
            model: "categories",
            key: "id"
        }
    },
    shop_id:{
        type: Sequelize.BIGINT(20),
        references: {
            model: "shops",
            key: "id"
        }
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

