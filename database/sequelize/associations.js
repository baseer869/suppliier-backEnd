module.exports = function (db) {

    db.users.hasMany(db.cart, {
        as: 'carts',
        foreignKey: 'userId',
    });
    db.cart.belongsTo(db.users, {
        as: "users",
        foreignKey: 'userId',
    });
    
 

    // --// shop -> Category
    db.shops.hasMany(db.shop_category, {
        as :"shop_category",
        foreignKey: 'category_id',
    });
    db.shop_category.belongsTo(db.shops, {
        as :"categories",
        // through: db.shop_and_categories,
        foreignKey: 'category_id',
    });

    //shop and categories relation 

    db.categories.hasMany(db.shop_and_categories,{
        as:"shop_and_categories",
        foreignKey: 'category_id'
    });
    db.shop_and_categories.belongsTo(db.categories, {
        as:'categories',
        foreignKey: 'category_id'
    })


    // CART
     // cart -> product

     db.products.hasMany(db.cart, {
        as:'carts_products',
        foreignKey:"productId",
    });
    db.cart.belongsTo(db.products, {
        as:'products',
        foreignKey:"productId",
    });


    // db.shops.hasMany(db.cart, {
    //     as:'carts_shop',
    //     foreignKey:"shopId",
    // });
    // db.cart.belongsTo(db.shops, {
    //     as:'shops',
    //     foreignKey:"shopId",
    // });
    
    //

    db.products.hasMany(db.cart_items, {
        as:'cart_items',
        foreignKey:"productId",
    });
    db.cart_items.belongsTo(db.products, {
        as:'cart_items',
        foreignKey:"productId",
    });
}