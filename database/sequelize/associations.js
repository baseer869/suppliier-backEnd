module.exports = function (db) {

    db.users.hasMany(db.cart, {
        as: 'carts',
        foreignKey: 'userId',
    });
    db.cart.belongsTo(db.users, {
        as: "users",
        foreignKey: 'userId',
    });
    

     db.products.hasMany(db.cart, {
        as:'carts_products',
        foreignKey:"productId",
    });
    db.cart.belongsTo(db.products, {
        as:'products',
        foreignKey:"productId",
    });



    //
    db.store.hasMany(db.products, {
        as:'store_products',
        foreignKey:"store_id",
    });
    db.products.belongsTo(db.store, {
        as:'stores',
        foreignKey:"store_id",
    });
    
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