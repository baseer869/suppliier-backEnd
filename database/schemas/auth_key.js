const crypto = require('crypto');
const Sequelize = require('sequelize');

 module.exports = function (sequelize, Sequelizew ) {

const Model = sequelize.define('auth_keys', {
    id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    auth_key:{
        type: Sequelize.STRING,
        trim: true,
    },
    user_id: {
        type: Sequelize.BIGINT(20),
        references: {
            model: "users",
            key: "id"
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
}


