const { DataTypes, Sequelize } = require('sequelize');

module.exports = function (sequelize, Sequelizew) {

    const Model = sequelize.define('shop', {
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
        title:{
            type: DataTypes.STRING,
            trim: true,
        },
        attachement: {
            type: DataTypes.STRING,
        },
        status: {
            type: Sequelize.ENUM,
            values: ['0', '1',], //0 for close  1 for open
            defaultValues: '1'
        },
        shop_category_id: {
            type: Sequelize.BIGINT(20),
            references: {
                model: "shop_categories",
                key: "id"
            }
        },
        request_id: {
            type: Sequelize.BIGINT(20),
            references: {
                model: "shop_requests",
                key: "id"
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
        market_id: {
            type: Sequelize.BIGINT(20),
            references: {
                model: "markets",
                key: "id"
            }
        },
        category_id:{
            type: Sequelize.BIGINT(20),
            references: {
                model: "categories",
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
    }
    );
    return Model;
}
