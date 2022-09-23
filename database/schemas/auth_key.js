const Sequelize = require('sequelize');

module.exports = function (sequelize, Sequelize) {
    let Model = sequelize.define('authkeys', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.BIGINT(20),
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        admin_id: {
            type: Sequelize.BIGINT(20),
            allowNull: true,
            references: {
                model: 'admin',
                key: 'id'
            }
        },
        auth_key: {
            type: Sequelize.STRING,
        },
    
        // device_id: {
        //     type: Sequelize.STRING,
        // },
        // device_info: {
        //     type: Sequelize.STRING,
        // },
        // device_type: {
        //     type: Sequelize.ENUM,
        //     values: ['ios', 'andriod'],
        // },
        // device_token: {
        //     type: Sequelize.TEXT,
        // },
        // language: {
        //     type: Sequelize.ENUM,
        //     values: ['en', 'ar'],
        // },
         expiry:{
            type: Sequelize.DATE,
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
        }
    }, {
        tableName: 'authkeys'
    });
    return Model;
};
