const sequelize = require('../../db');
const Sequelize = sequelize.sequelize;
const instance = sequelize.instance();

let db = {
 instance: instance,
 Sequelize: Sequelize,
 users : (require('../schemas/user'))(instance, Sequelize),
 products: (require('../schemas/product'))(instance, Sequelize),
 auth_key: (require('../schemas/auth_key'))(instance, Sequelize),
 categories: (require('../schemas/categories'))(instance, Sequelize),
 store: (require('../schemas/store'))(instance, Sequelize),
 store_categories: (require('../schemas/store_categories'))(instance, Sequelize),
 markets: (require('../schemas/markets'))(instance, Sequelize),
 cart: (require('../schemas/cart'))(instance, Sequelize),
 cart_items: (require('../schemas/cart_items'))(instance, Sequelize),
 order : (require('../schemas/order'))(instance, Sequelize),
 orderDetail : (require('../schemas/orderDetail'))(instance, Sequelize),
 Inquery : (require('../schemas/Inquery'))(instance, Sequelize),
//
app_advertisement : (require('../schemas/app_advertisement'))(instance, Sequelize),
product_images : (require('../schemas/product_images'))(instance, Sequelize),
products_shipping_charges : (require('../schemas/products_shipping_charges'))(instance, Sequelize),



};

(require("./associations"))(db,sequelize);
module.exports = db;