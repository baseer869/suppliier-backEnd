const sequelize = require('../../db');
const Sequelize = sequelize.sequelize;
const instance = sequelize.instance();

let db = {
 instance: instance,
 Sequelize: Sequelize,
 users : (require('../schemas/user'))(instance, Sequelize),
 products: (require('../schemas/product'))(instance, Sequelize),
 shop_request: (require('../schemas/shop_request'))(instance, Sequelize),
 auth_key: (require('../schemas/auth_key'))(instance, Sequelize),
 shops: (require('../schemas/shop'))(instance, Sequelize),
 categories: (require('../schemas/categories'))(instance, Sequelize),
 shop_and_categories: (require('../schemas/shop_and_categories'))(instance, Sequelize),
 markets: (require('../schemas/markets'))(instance, Sequelize),
 shop_category: (require('../schemas/shop_category'))(instance, Sequelize),
 cart: (require('../schemas/cart'))(instance, Sequelize),
 cart_items: (require('../schemas/cart_items'))(instance, Sequelize),
 order : (require('../schemas/order'))(instance, Sequelize),
 orderDetail : (require('../schemas/orderDetail'))(instance, Sequelize),
 Inquery : (require('../schemas/Inquery'))(instance, Sequelize)



};

(require("./associations"))(db);
module.exports = db;