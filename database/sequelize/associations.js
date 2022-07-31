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


    //  order  -> user
    db.users.hasMany(db.order, {
        as:"orders",
        foreignKey: "userId"
    });
    db.order.belongsTo(db.users, {
        as: "users_order",
        foreignKey: "userId"

    })

    //
    db.order.hasMany(db.orderDetail, {
        // as:"orderDetails",
        foreignKey:"orderId"    
    });
    db.orderDetail.belongsTo(db.users, {
        // as:"orderDetails",
        foreignKey:"orderId"   
    })
 

    // order  product  association 

    db.products.hasMany(db.orderDetail, {
        // as:"ordered_products",
        foreignKey:"productId"
    })
    db.orderDetail.belongsTo(db.products,{
        // as:"products",
        foreignKey:"productId"
    })
    db.products.hasMany(db.product_images, {
        as:"product_images",
        foreignKey:"productId"
    })
    db.product_images.belongsTo(db.products,{
        as:"product_images",
        foreignKey:"productId"
    })
    db.products.hasMany(db.products_shipping_charges, {
        as:"products_shipping_charges",
        foreignKey:"productId"
    })
    db.products_shipping_charges.belongsTo(db.products,{
        as:"product_charges",
        foreignKey:"productId"
    })
}