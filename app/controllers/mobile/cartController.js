const { Op, Sequelize } = require("sequelize");
const db = require("../../../database/sequelize/sequelize");
const models = require("../../../database/sequelize/sequelize");
const sendResponse = require("../../utility/functon/sendResponse");

/********************** CART ************************************* */

module.exports = {
  addUpdateCart: async (req, res, next) => {
    try {
      let cart;
      let cartDetail = {
        userId: parseInt(req.body.userId),
        status: req.body.status.trim(),
      };
      let findQuery = {
        where: { userId: req.body.userId },
      };
      let isUser = await models.cart.findOne(findQuery);

      if (isUser) {
        let isProductAlreadyInCart = await models.cart_items.findOne({
          where: {
            cartId: isUser.dataValues.id,
            productId: req.body.productId,
          },
        });
        if (isProductAlreadyInCart) {
          isProductAlreadyInCart.dataValues.totalPrice += req.body.price;
          isProductAlreadyInCart.dataValues.quantity + 1;
          let cartUpdated;
          cartUpdated = await models.cart_items.update(
            {
              totalPrice: isProductAlreadyInCart.dataValues.totalPrice,
              quantity: (isProductAlreadyInCart.dataValues.quantity += 1),
            },
            {
              where: {
                cartId: isProductAlreadyInCart.dataValues.cartId,
                productId: isProductAlreadyInCart.dataValues.productId,
              },
            }
          );
          if (cartUpdated) {
            return res.status(200).send({
              status: 200,
              message: "Item updated",
              item: cartUpdated,
            });
          } else {
            return res.status(200).send({
              status: 200,
              message: "not updated",
              item: cartUpdated,
            });
          }
        } else if (!isProductAlreadyInCart) {
          let cartItemDetail = {
            cartId: isUser.id,
            productId: parseInt(req.body.productId),
            totalPrice: req.body.firstPrice,
            quantity: req.body.quantity,
          };
          let cartItem = new models.cart_items(cartItemDetail);
          let itemAdded = await cartItem.save(cartItem);

          if (itemAdded) {
            return res.status(200).send({
              status: 200,
              message: "Item added to cat",
              data: cart,
            });
          } else {
            return res.status(200).send({
              status: 200,
              message: "DB Error",
              data: cart,
            });
          }
        } else {
          return res.status(400).send({
            status: 400,
            message: "Something went wrong",
          });
        }
      } else if (!isUser) {
        cart = new models.cart(cartDetail);
        cart = await cart.save(cart);
        if (cart) {
          let cartItemDetail = {
            cartId: cart.id,
            productId: parseInt(req.body.productId),
            totalPrice: req.body.firstPrice,
            quantity: req.body.quantity,
          };
          let cartItem = new models.cart_items(cartItemDetail);
          let itemAdded = await cartItem.save(cartItem);

          if (itemAdded) {
            return res.status(200).send({
              status: 200,
              message: "Item added to cat",
              data: cart,
            });
          } else {
            return res.status(200).send({
              status: 200,
              message: "DB Error",
              data: cart,
            });
          }
        } else {
          return res.status(400).send({
            status: 400,
            message: "Something went wrong",
          });
        }
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  //
  addUpdateCart2: async (req, res, next) => {
    try {
      let cart;
      let findQuery = {
        where: {
          [Op.and]: [
            { productId: parseInt(req.body.productId) },
            { userId: req.userId },
          ],
          productId: parseInt(req.body.productId),
        },
      };
      let itemInCart = await models.cart.findOne(findQuery);
      if (itemInCart) {
        itemInCart.dataValues.totalPrice += req.body.firstPrice;
        itemInCart.dataValues.quantity + 1;
        let cartUpdated;
        cartUpdated = await models.cart.update(
          {
            totalPrice: itemInCart.dataValues.totalPrice,
            quantity: (itemInCart.dataValues.quantity += 1),
          },
          {
            where: {
              id: itemInCart.dataValues.id,
              productId: itemInCart.dataValues.productId,
            },
          }
        );
        if (cartUpdated) {
          return res.status(200).send({
            status: 200,
            message: "Item updated",
            item: cartUpdated,
          });
        } else {
          return res.status(200).send({
            status: 200,
            message: "not updated",
            item: cartUpdated,
          });
        }
      } else if (!itemInCart) {
        let cartDetail = {
          productId: parseInt(req.body.productId),
          totalPrice: req.body.firstPrice,
          quantity: req.body.quantity,
          userId: req.userId,
        };
        let cartItem = new models.cart(cartDetail);
        let itemAdded = cartItem.save(cartItem);

        if (itemAdded) {
          return res.status(200).send({
            status: 200,
            message: "Item added to cat",
            data: cartItem,
          });
        } else {
          return res.status(200).send({
            status: 200,
            message: "DB Error",
            data: cart,
          });
        }
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listCart: async (req, res, next) => {
    try {
      let totalAmount;
      let shippingFee = 0;
      let findQuery = {
        where: { userId: req.userId },

        include: [
          {
            model: models.users,
            as: "users",
            attributes: [
              "id",
              "username",
              "city",
              "state",
              "zip",
              "address",
              "phone",
            ],
            required: true,
          },
          {
            model: models.products,
            as: "products",
            include :{
              attributes :['id', 'images','productId'],
              model : models.product_images,
              as:'product_images',
            }
          },

        
        ],
        order: [['productId', 'DESC']]
      };
      let list = await models.cart.findAll(findQuery);
      if (!list || list.length == []) {
        return res.status(202).json({
          status: 202,
          message: "No Record",
          data: null,
        });
      } else if (list.length > 0) {
        const initialValue = 0;
        totalAmount = list.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.dataValues.totalPrice,
          initialValue
        );
        return res.status(200).json({
          status: 200,
          message: "fetch succesfully",
          data: {
            shippingFee: shippingFee,
            totalAmount: totalAmount,
            list: list,
          },
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  removeFromCart: async (req, res, next) => {
    try {
      let cart;
      let findQuery = {
        where: {
          [Op.and]: [
            { productId: parseInt(req.body.productId) },
            { userId: req.userId },
          ],
        },
      };
      let itemInCart = await models.cart.findOne(findQuery);
      if (itemInCart && itemInCart.dataValues.quantity > 1) {
        itemInCart.dataValues.totalPrice -= req.body.firstPrice;
        itemInCart.dataValues.quantity - 1;
        let cartUpdated;
        cartUpdated = await models.cart.update(
          {
            totalPrice: itemInCart.dataValues.totalPrice,
            quantity: (itemInCart.dataValues.quantity -= 1),
          },
          {
            where: {
              id: itemInCart.dataValues.id,
              productId: itemInCart.dataValues.productId,
            },
          }
        );
        if (cartUpdated) {
          return res.status(200).send({
            status: 200,
            message: "Item updated",
            item: cartUpdated,
          });
        } else {
          return res.status(201).send({
            status: 201,
            message: "DB Error",
            item: cartUpdated,
          });
        }
      } else {
        let removeFromCart = await models.cart.destroy(findQuery);
        if (removeFromCart) {
          return res.status(200).send({
            status: 200,
            message: "Successfully removed from cart",
            data: cart,
          });
        } else {
          return res.status(200).send({
            status: 200,
            message: "DB Error",
            data: cart,
          });
        }
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  checkout: async (req, res, next) => {
    try {
      let findQuery = {
        where: { userId: req.userId },
      };
      // let t = db.Sequelize.transaction;
      let orderDetail = { ...req.body };
      orderDetail.userId = req.userId;
      orderDetail.orderDate = Date.now();
      orderDetail.orderNumber = Math.floor(100000 + Math.random() * 900000);
      let order = new models.order(orderDetail);
      let isOrderPlaced = await order.save(order);

      if (isOrderPlaced) {
        // for sinle order
        let orderDetails = [];

        if (req.body.isCartItem == true) {
          for (let index = 0; index < req.body.product.length; index++) {
            orderDetails.push({
              orderId: isOrderPlaced.id,
              productId: req.body.product[index].productId,
              quantity: req.body.product[index].quantity,
              price: req.body.product[index].totalPrice,
              discount: req.body.product[index].discount,
              orderNumber: isOrderPlaced.dataValues.orderNumber,
              total: req.body.totalAmount,
            });
          }
        } else if(req.body.isCartItem == false) {
          for (let index = 0; index < req.body.product.length; index++) {
            orderDetails.push({
              orderId: isOrderPlaced.id,
              productId: req.body.product[index].id,
              quantity: req.body.product[index].quantity,
              price: req.body.product[index].price,
              // discount: req.body.product[index].discount,
              orderNumber: isOrderPlaced.dataValues.orderNumber,
              total: req.body.totalAmount,
            });
        console.log("orderDetails", orderDetails )

          }

        }
        let isPlaced = await models.orderDetail.bulkCreate(orderDetails);
        if (isPlaced) {
          if(req.body.isCartItem == true){
            let removeCartItem = await models.cart.destroy(findQuery);

          }
            return res.status(200).send({
              status: 200,
              message: "order successfully placed!",
              order: isOrderPlaced,
            });
         
        } else {
          return res.status(200).send({
            status: 200,
            message: "DB error while saving order",
            order: null,
          });
        }
      } else {
        return res.status(200).send({
          status: 200,
          message: "DB error while saving set order",
          order: null,
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listUserOrder: async (req, res, next) => {
    try {
      let findQuery = {
        where: { userId: req.userId },
        include: [
          {
            model: models.orderDetail,
            as: "orderDetails",
            attributes:['id','orderId','productId','orderNumber','price','quantity','total'],
            include: [
              {
                model: models.products,
                attributes:['id','name','attachment','originalPrice','price',],
                include :{
                  attributes :['id', 'images','productId'],
                  model : models.product_images,
                  as:'product_images',
                }
              },
            ],
          },
        ],
      };
      let orders = await models.order.findAll(findQuery);
      if (!orders) {
        return res.status(202).json({
          status: 202,
          message: "No Record",
          data: null,
        });
      }
      return res.status(200).json({
        status: 200,
        message: "fetch successfully",
        data: orders,
      });
    } catch (error) {
      sendResponse.error(error);
    }
  },
};


