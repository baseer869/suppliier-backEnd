const { Op, Sequelize } = require("sequelize");
const db = require("../../../database/sequelize/sequelize");
const Pagination = require("../../../app/utility/calls/pagination");

const models = require("../../../database/sequelize/sequelize");
const sendResponse = require("../../utility/functon/sendResponse");
const sequelize = require("sequelize");

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
        itemInCart.dataValues.totalPrice += req.body.price;
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
          totalPrice: req.body.price,
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
        itemInCart.dataValues.totalPrice += req.body.price;
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
          return res.status(202).json({
            status: 202,
            message: "Unable to update cart",
            data: {
              cart: cartUpdated
            },
          });
        }
      } else if (!itemInCart) {
        let cartDetail = {
          productId: parseInt(req.body.id),
          totalPrice: req.body.price,
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
          // {
          //   model: models.users,
          //   as: "users",
          //   attributes: [
          //     "id",
          //     "username",
          //     "state",
          //     "zip",
          //     "address",
          //     "phone",
          //   ],
          //   required: true,
          // },
          {
            model: models.products,
            as: "products",
            include: {
              attributes: ['id', 'uri', 'productId'],
              model: models.product_images,
              as: 'product_images',
            }
          },
        ],
        order: [['productId', 'DESC']]
      };
      let list = await models.cart.findAll(findQuery);
      if (!list || list.length == []) {
        return res.status(202).send({
          status: 202,
          message: "No Items in cart",
          data: {
            list: null,
          },
        });
      } else if (list.length > 0) {
        const initialValue = 0;
        totalAmount = list.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.dataValues.totalPrice,
          initialValue
        );
        return res.status(200).send({
          status: 200,
          message: "fetch successfull",
          data: {
            // shippingFee: shippingFee,
            totalAmount: totalAmount,
            list: list,
          },
        });
      }
    } catch (error) {
      sendResponse.error(error, next, res);
    }
  },

  countCart: async (req, res, next) => {
    try {
      let findQuery = {
        where: { userId: req.userId },
      };
      let cart = await models.cart.findAndCountAll(findQuery);
      if (!cart || cart == 0) {
        return res.status(202).send({
          status: 202,
          message: "No Items in cart",
          data: {
            CartCount: null,
          },
        });
      } else if (cart) {
        return res.status(200).send({
          status: 200,
          message: "fetch successfull",
          data: {
            CartCount: cart.count
          },
        });
      }
    } catch (error) {
      sendResponse.error(error, next, res);
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
        itemInCart.dataValues.totalPrice -= req.body.price;
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
          message: "",
          data: {
            address: address
          },
        });
      } else if (!address) {
        return res.status(202).json({
          status: 202,
          message: "Address Not found",
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
        return sendResponse.dbError(address, req, res);
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(error, next, res);
    }
  },


  listRecentSearches: async (req, res, next) => {
    try {
      let findQuery = {
        where: {
          deviceId: req.body.deviceId,
        },
        include: {
          model: models.products,
          attributes: ['id', 'name', 'price', 'profit', 'product_code',],
          include: {
            model: models.product_images,
            as: "product_images",
            attributes: ['id', 'url']
          }
        },
        order: [
          ['id', 'DESC'],
        ],

      }
      let searches = await models.recentSearches.findAll(findQuery);
      if (searches) {
        return res.status(200).json({
          status: 200,
          message: "searches found",
          data: {
            searches: searches
          },
        });
      } else if (!searches) {
        res.status(200).json({
          status: 200,
          message: "You didn't made any search",
          data: {
            searches: searches
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
          return res.status(400).json({
            status: 400,
            message: "Unable to place your order.",
            data: {
              order: null
            },
          });
        }
      } else {
        return res.status(402).json({
          status: 402,
          message: "Can't save your order, Try again",
          data: {
            order: null
          },
        });
      }
    } catch (error) {
      sendResponse.error(error, next, res);
    }
  },

  listOrder: async (req, res, next) => {
    try {
      var OrderStatus;
      let findQuery = {
        where: {
          userId: req.userId,
          // transactionStatus: OrderStatus
        },
        include: [
          {
            model: models.shipping_details,
            separate: true,

          },
          {
            model: models.orderDetail,
            attributes: ['id', 'orderId', 'productId', 'orderNumber', 'price', 'quantity', 'total'],
            include: [
              {
                model: models.products,
                attributes: ['id', 'name', 'attachment', 'product_code', 'originalPrice', 'price',],
                include: {
                  attributes: ['id', 'uri', 'productId'],
                  model: models.product_images,
                  // as: 'product_images',
                },

              },
              
            ],
          },
         
        ],
      
      };
      //
      if (req.query.transStatus) {
        OrderStatus = req.query.transStatus;
        findQuery.where.transactionStatus = OrderStatus
      }
      if(req.query.search) {
        findQuery.where = { orderNumber: { [Op.like]: "%" + `${req.query.search}` + "%" } } 
      }

      let pagination = new Pagination(req, findQuery);
      let orders = await models.order.findAndCountAll(findQuery);
      pagination.setCount(orders.count);
      if (!orders || orders.rows.length == []) {
        return res.status(202).json({
          status: 202,
          message: "You have no orders",
          data: {
            order: null
          },
        });
      }else if (orders || orders.rows.length > 0) {
          return res.status(200).json({
            status: 200,
            message: "",
            data: {
              order: orders.rows,
              pagination: pagination,
            },
          });
      }
    } catch (error) {
      sendResponse.error(error, next, res);

    }
  },

  //--//
  listOrder2: async (req, res, next) => {
    try {
      var OrderStatus;
      let findQuery = {
        where: {

        },
        include: [
          {
            model: models.orderDetail,
            attributes: ['id', 'orderId', 'productId', 'orderNumber', 'price', 'quantity', 'total'],
            separate: true,
            include: [
              {
                model: models.products,
                attributes: ['id', 'name', 'attachment', 'product_code', 'originalPrice', 'price',],
                include: {
                  attributes: ['id', 'uri', 'productId'],
                  model: models.product_images,
                  separate: true,
                }
              },
            ],
          },
        ],
      };
      //
      if (req.query.transStatus) {
        OrderStatus = req.query.transStatus;
        findQuery.where.transactionStatus = OrderStatus
      }
      let pagination = new Pagination(req, findQuery);
      let orders = await models.order.findAndCountAll(findQuery);
      pagination.setCount(orders.count)
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
          order: orders.rows,
          pagination: pagination
        },
      });
    } catch (error) {
      sendResponse.error(error, next, res);

    }
  },

  orderDetail: async (req, res, next) => {
    try {
      let findQuery = {
        where: {
          id: req.params.id
        },

        include: [
          {

            model: models.orderDetail,
            attributes: ['id', 'orderId', 'productId', 'orderNumber', 'price', 'quantity', 'total'],
            include: [
              {
                model: models.products,
                attributes: ['id', 'name', 'attachment', 'product_code', 'originalPrice', 'price',],
                include: {
                  attributes: ['id', 'uri', 'productId'],
                  model: models.product_images,
                  // as: 'product_images',
                }
              },
            ],
          },
        ],
      };
      let orders = await models.order.findAll(findQuery);
      if (!orders || orders.length == []) {
        return res.status(202).json({
          status: 202,
          message: "You have no orders",
          data: {
            order: null
          },
        });
      } else if (orders || orders.length > 0) {
        let findQuery = {
          where: {
            id: orders[0]?.userId
          },
          attributes: ['id', 'username',],
          include: [{
            where: { default: "1" },
            attributes: ['id', 'userId', 'customer_name', 'phone', 'address', 'state', 'city'],
            model: models.shipping_details,
            as: "shipping_details"
          }]
        }
        let user = await models.users.findOne(findQuery);
        return res.status(200).json({
          status: 200,
          message: "Fetch successfull",
          data: {
            details: orders,
            user: user,
          },
        });

      }
    } catch (error) {
      sendResponse.error(error, next, res);

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
          for (let index = 0; index < orderDetail.product.length; index++) {
            orderDetails.push({
              orderId: isOrderPlaced.id,
              productId: req.body.product[index].productId,
              quantity: req.body.product[index].quantity,
              price: req.body.product[index].totalPrice,
              // discount: req.body.product[index].discount,
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

          }

        }

        let isPlaced = await models.orderDetail.bulkCreate(orderDetails);
        if (isPlaced) {
          if (req.body.isCartItem == true) {
            await models.cart.destroy(findQuery);
          }
          res.status(200).json({
            status: 200,
            message: "Order successfully placed",
            data: {
              order: isOrderPlaced
            },
          });
        } else {
          return res.status(404).send({
            status: 404,
            message: "DB error while saving order",
            data: null,
          });
        }
      }
    } catch (error) {
      sendResponse.error(error, next, res);
    }
  },

  cancelOrder: async (req, res, next) => {
    try {
      let { transactionStatus, id, type, processed_by, reason } = req.body
      let [order] = await models.order.update({ transactionStatus: transactionStatus, paid: '0', reason: reason }, { where: { id: id, userId: req.userId } })

      if (order == 1) {

        return res.status(200).send({
          status: 200,
          message: "cancel successful",
          data: null
        });
      } else {
        return res.status(404).send({
          status: 404,
          message: "Unable to cancel your order try again",
          data: {
            order: null,
          },
        });
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(error, next, res);
    }
  },

  //--//
  transcationRequest: async (req, res, next) => {
    try {
      // let findQuery = {
      //   where: {

      //   },

      // };
      let user = await models.users.findOne({ where: { id: req.userId } });
      if (!user) {
        return res.status(202).json({
          status: 202,
          message: "Could found !",
          data: null
        });
      }
      if (user && user.dataValues.balance > req.body.debitAmount) {
        // found user and create the trans_request // debit request 
        if (req.body.debitAmount < 500) {
          return res.status(202).json({
            status: 202,
            message: "Sorry, The minimum amount is to transferred is 500\nAfter one week an amount will be automatically transferred to your account.",
            data: null
          });
        }
        req.body.user_id = req.userId
        let transcationRequest = await models.transcation_requests.create(req.body)
        if (transcationRequest) {
          return res.status(200).json({
            status: 200,
            message: "your request is submitted\nAn amount will be transferred to your account once verified. ",
            data: {
              transcationRequest: transcationRequest
            }
          });
        } else {
          return res.status(202).json({
            status: 202,
            message: "Unable to prcesses your request, try again",
            data: null
          });
        }
      }

    } catch (error) {
      sendResponse.error(error, next, res);

    }
  },



  //--//
  listUser: async (req, res, next) => {
    try {
      let user = await models.users.findAll();
      if (!user || user.length == []) {
        return res.status(202).json({
          status: 202,
          message: "No user",
          data: {
            user: null
          },
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Fetch successfully",
        data: {
          users: user
        },
      });
    } catch (error) {
      sendResponse.error(error, next, res);

    }
  },

  //--//
  getUser: async (req, res, next) => {
    try {
      let { id } = req.params
      let user = await models.users.findOne({ where: { id: id } });
      if (!user || user.length == []) {
        return res.status(202).json({
          status: 202,
          message: "No user",
          data: {
            user: null
          },
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Fetch successfully",
        data: {
          user: user
        },
      });
    } catch (error) {
      sendResponse.error(error, next, res);

    }
  },


  //--//
  updateUserWallet: async (req, res, next) => {
    try {
      let { balance, id, debitAmount, } = req.body
      let updatedBalance = balance - debitAmount;

      let [isUpdated] = await models.users.update({ balance: updatedBalance, }, { where: { id: id } });

      if (isUpdated) {
        //save trans logs 
        return res.status(200).json({
          status: 200,
          message: "Amount updated",
          data: {
            user: isUpdated
          },
        });
      }
    } catch (error) {
      sendResponse.error(error, next, res);

    }
  },


  //--//
  UserWallet: async (req, res, next) => {
    try {

      let findQuery = {
        where: { id: req.userId }
      }
      let user = await models.users.findOne(findQuery);

      if (user) {
        return res.status(200).json({
          status: 200,
          message: "Fetch Successful",
          data: {
            user: user
          },
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "Data base error, try again",
          data: null
        });
      }
    } catch (error) {
      sendResponse.error(error, next, res);

    }
  },
  addBankAccountDetail: async (req, res, next) => {
    try {
      let { account_benefciary_name, bank_name, account_number, account_name } = req.body

      let bank_details = await models.bank_details.create({
        account_benefciary_name: String(account_benefciary_name).trim() || null,
        userId: req.userId,
        bank_name: String(bank_name).trim(),
        account_name: String(account_name).trim(),
        account_number: String(account_number).trim()
      });
      if (bank_details) {
        return res.status(200).send({
          status: 200,
          message: "Your Bank Details Successfully Added",
          data: bank_details
        });
      } else {
        return res.status(404).send({
          status: 404,
          message: "Sorry!\nFailed to save your bank details, try again",
          data: {
            bank_details: null,
          },
        });
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(error, next, res);
    }
  },
  BankAccountDetail: async (req, res, next) => {
    try {

      let findQuery = {
        where: { userId: req.userId }
      }
      let bankDetails = await models.bank_details.findOne(findQuery);
      if (bankDetails) {
        return res.status(200).json({
          status: 200,
          message: "",
          data: {
            bankDetails: bankDetails
          },
        });
      } else if(!bankDetails) {
        return res.status(202).json({
          status: 202,
          message: "Please add bank details",
          data: null
        });
      } else {
        return res.status(202).json({
          status: 202,
          message: "Database error, try again",
          data: null
        });
      }
    } catch (error) {
      sendResponse.error(error, next, res);

    }
  },


  editBankAccountDetail: async (req, res, next) => {
    try {
      let { account_benefciary_name, bank_name, account_number, account_name } = req.body

      let bank_details = await models.bank_details.update({
        account_benefciary_name: String(account_benefciary_name).trim() || null,
        userId: req.userId,
        bank_name: String(bank_name).trim(),
        account_name: String(account_name).trim(),
        account_number: String(account_number).trim()
      }, {where : { userId: req.userId }});
      if (bank_details) {
        return res.status(200).send({
          status: 200,
          message: "Your Bank Details Successfully Updated",
          data: bank_details
        });
      } else {
        return res.status(404).send({
          status: 404,
          message: "Sorry!\nFailed to update your bank details, try again",
          data: {
            bank_details: null,
          },
        });
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(error, next, res);
    }
  },

};


