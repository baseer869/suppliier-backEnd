const { Op, Sequelize } = require("sequelize");
const db = require("../../../database/sequelize/sequelize");
const models = require("../../../database/sequelize/sequelize");
const sendResponse = require("../../utility/functon/sendResponse");

/********************** CART ************************************* */

module.exports = {
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

  //--//

  addToCart: async (req, res, next) => {
    try {
      console.log('Here')
      let findQuery;
      findQuery = {
        where: {
          [Op.and]: [
            { productId: parseInt(req.body.id) },
            { userId: req.userId },
          ],
        },
      };
      let itemInCart = await models.cart.findOne(findQuery);

      //--//
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
          return res.status(200).json({
            status: 200,
            message: "Cart Updated",
            data: {
              cart: cartUpdated
            },
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Unable to update cart",
            data: {
              cart: cartUpdated
            },
          });
        }
      } else if (!itemInCart) {
        let cartDetail = {
          productId: parseInt(req.body.id),
          totalPrice: req.body.firstPrice,
          quantity: req.body.quantity,
          userId: req.userId,
        };
        let cartItem = new models.cart(cartDetail);
        let itemAdded = await cartItem.save(cartItem);
        if (itemAdded) {
          return res.status(200).json({
            status: 200,
            message: "Item added To Cart",
            data: {
              cart: itemAdded
            },
          });
        } else {
          return sendResponse.dbError(result, req, res);
        }
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(error, next, res);
    }
  },


  // removeFromCart: async (req, res, next) => {
  //   try {
  //     console.log('Here')
  //     let findQuery;
  //     findQuery = {
  //       where: {
  //         [Op.and]: [
  //           { productId: parseInt(req.body.id) },
  //           { userId: req.userId },
  //         ],
  //       },
  //     };
  //     let itemInCart = await models.cart.findOne(findQuery);

  //     //--//
  //     if (itemInCart) {
  //       itemInCart.dataValues.totalPrice -= req.body.firstPrice;
  //       itemInCart.dataValues.quantity - 1;
  //       let cartUpdated;
  //       cartUpdated = await models.cart.update(
  //         {
  //           totalPrice: itemInCart.dataValues.totalPrice,
  //           quantity: (itemInCart.dataValues.quantity -= 1),
  //         },
  //         {
  //           where: {
  //             id: itemInCart.dataValues.id,
  //             productId: itemInCart.dataValues.productId,
  //           },
  //         }
  //       );
  //       if (cartUpdated) {
  //         return res.status(200).json({
  //           status: 200,
  //           message: "Cart Updated",
  //           data: {
  //             cart: cartUpdated
  //           },
  //         });
  //       } else {
  //         return res.status(200).json({
  //           status: 200,
  //           message: "Unable to update cart",
  //           data: {
  //             cart: cartUpdated
  //           },
  //         });
  //       }
  //     } else if (itemAdded) {
  //         return res.status(200).json({
  //           status: 200,
  //           message: "Item Not Found",
  //           data: {
  //             cart: null
  //           },
  //         });
  //       } else {
  //         return sendResponse.dbError(result, req, res);
  //       }
  //   } catch (error) {
  //     console.log(error);
  //     sendResponse.error(error, next, res);
  //   }
  // },

  //--//
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
            include: {
              attributes: ['id', 'images', 'productId'],
              model: models.product_images,
              as: 'product_images',
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

  //--//
  removeFromCart: async (req, res, next) => {
    try {
      let cart;
      let findQuery = {
        where: {
          [Op.and]: [
            { productId: parseInt(req.body.id) },
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
          return res.status(200).json({
            status: 200,
            message: "Cart Updated",
            data: {
              cart: cartUpdated
            },
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Unable to update cart",
            data: {
              cart: cartUpdated
            },
          });
        }
      } else {
        let removeFromCart = await models.cart.destroy(findQuery);
        if (removeFromCart) {
          return res.status(200).json({
            status: 200,
            message: "Removed Success",
            data: {
              cart: removeFromCart
            },
          });
        } else {
          return sendResponse.dbError(result, req, res);
        }
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(error, next, res);
    }
  },
  //--//


  addAddress: async (req, res, next) => {
    try {
      let Detail = { ...req.body };
      Detail.userId = req.userId;
      let address = await models.shipping_details.create(Detail);
      if (address) {
        return res.status(200).json({
          status: 200,
          message: "Address added successfully",
          data: {
            address: address
          },
        });
      }
      else {
        return sendResponse.dbError(result, req, res);
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(error, next, res);
    }
  },

  //--//

  getAddress: async (req, res, next) => {
    try {
      let findQuery = {
        where: {
          userId: req.userId,
          default: "1"
        }
      }
      let address = await models.shipping_details.findOne(findQuery);
      if (address) {
        return res.status(200).json({
          status: 200,
          message: "Address found",
          data: {
            address: address
          },
        });
      } else if(!address) {
        return res.status(202).json({
          status: 202,
          message: "No Default Address found",
          data: {
            address: null
          },
        });
      }
      else {
        return sendResponse.dbError(address, req, res);
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(error, next, res);
    }
  },

 //--//

 listAddress: async (req, res, next) => {
  try {
    let findQuery = {
      where: {
        userId: req.userId,
      }
    }
    let address = await models.shipping_details.findOne(findQuery);
    if (address) {
      return res.status(200).json({
        status: 200,
        message: "Address found",
        data: {
          address: address
        },
      });
    }
    else {
      return sendResponse.dbError(result, req, res);
    }
  } catch (error) {
    console.log(error);
    sendResponse.error(error, next, res);
  }
},




eidtAddress: async (req, res, next) => {
  try {
    let findQuery = {
      where: {
        userId: req.userId,
        id: req.body.id
      }
    }
    let address = await models.shipping_details.update(req.body, findQuery);
    if (address) {
      return res.status(200).json({
        status: 200,
        message: "Address updated",
        data: {
          address: address
        },
      });
    }
    else {
      return sendResponse.dbError(result, req, res);
    }
  } catch (error) {
    console.log(error);
    sendResponse.error(error, next, res);
  }
},

  //--//

  checkout2: async (req, res, next) => {
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
        let orderDetail = {
          orderId: isOrderPlaced.id,
          productId: req.body.productId,
          quantity: req.body.quantity,
          price: req.body.totalPrice,
          discount: req.body.discount || 0,
          orderNumber: isOrderPlaced.dataValues.orderNumber,
          total: req.body.totalAmount,
        }
        let orderPlaced = await models.orderDetail.create(orderDetail);
        if (orderPlaced) {


          // remove the cart item aginst 
          await models.cart.destroy({ where: { userId: req.userId } })
          return res.status(200).json({
            status: 200,
            message: "Congratulation, Order is been placed.",
            data: {
              order: orderPlaced
            },
          });

        } else {
          return res.status(200).json({
            status: 200,
            message: "Unable to place your order.",
            data: {
              order: null
            },
          });
        }
      } else {
        return res.status(400).json({
          status: 400,
          message: "Can't save your order, Try again",
          data: {
            order: null
          },
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listOrder: async (req, res, next) => {
    try {
      var OrderStatus = "Pending"
      let findQuery = {
        where: { 
          userId: req.userId,
          transactionStatus: OrderStatus
        },
        include: [
          {
            model: models.orderDetail,
            as: "orderDetails",
            attributes: ['id', 'orderId', 'productId', 'orderNumber', 'price', 'quantity', 'total'],
            // include: [
            //   {
            //     model: models.products,
            //     attributes: ['id', 'name', 'attachment', 'originalPrice', 'price',],
            //     include: {
            //       attributes: ['id', 'images', 'productId'],
            //       model: models.product_images,
            //       as: 'product_images',
            //     }
            //   },
            // ],
          },
        ],
      };
      //
      if(req.query.transStatus){
        OrderStatus = req.query.transStatus;
        findQuery.where.transactionStatus = OrderStatus  
      }
      let orders = await models.order.findAll(findQuery);
      if (!orders || orders.length == []) {
        return res.status(202).json({
          status: 202,
          message: "You have no orders",
          data: {
            order: null
          },
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Fetch successfull",
        data: {
          order: orders
        },
      });
    } catch (error) {
      sendResponse.error(error);
    }
  },


  //--//
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
        } else if (req.body.isCartItem == false) {
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
            console.log("orderDetails", orderDetails)

          }

        }
        let isPlaced = await models.orderDetail.bulkCreate(orderDetails);
        if (isPlaced) {
          if (req.body.isCartItem == true) {
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




  
};


