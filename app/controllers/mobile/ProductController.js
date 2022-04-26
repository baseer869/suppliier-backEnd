const { Op, Sequelize } = require("sequelize");
const models = require("../../../database/sequelize/sequelize");
const sendResponse = require("../../utility/functon/sendResponse");

module.exports = {
  addProduct: async (req, res, next) => {
    try {
      let product = new models.products(req.body);
      let item = await product.save();
      if (item) {
        return res.status(200).send({
          status: 200,
          message: "Product added successfully",
          data: item,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: "Db Error",
          data: [],
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },
  listProduct: async (req, res, next) => {
    try {
      let { search } = req.query;
      let findQuery = {
        where: [],
      };
      // if (search) {
      //     findQuery.where.push({ name: { [Op.like]: '%' + search + '%' } });
      // }
      let list = await models.products.findAll({});
      if (!list) {
        return res.status(200).send({
          status: 200,
          messsage: "No record",
          data: [],
        });
      }
      return res.status(200).send({
        status: 200,
        message: "fetch successfull",
        data: {
          list: list,
        },
      });
    } catch (error) {
      sendResponse.error(error);
    }
  },
  editProduct: async (req, res, next) => {
    try {
      let findQuery = {
        where: { id: req.params.id },
      };
      let product = await models.products.findOne(findQuery);
      if (!product) {
        return res.status(200).send({
          status: 200,
          messsage: "No record",
          data: [],
        });
      }
      let isUpdated = await models.products.update(req.body, findQuery);
      if (isUpdated) {
        return res.status(200).send({
          status: 200,
          message: "fetch successfull",
          data: isUpdated,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: "DB error",
          data: [],
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      let findQuery = {
        where: { id: req.params.id },
      };
      let product = await models.products.destroy(findQuery);
      if (product) {
        return res.status(200).send({
          status: 200,
          message: "Product deleted",
          data: product,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: "Record not found",
          data: [],
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  changeProductStatus: async (req, res, next) => {
    try {
      let findQuery = {
        where: { id: req.params.id },
      };
      let product = await models.products.update(findQuery);
      if (product) {
        return res.status(200).send({
          status: 200,
          message: "Product deleted",
          data: product,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: "Record not found",
          data: [],
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listStoreCategory: async (req, res, next) => {
    try {
      let findQuery = {
        where: { shop_id: req.params.id },
      };
      let list = await models.shop_category.findOne(findQuery);
      if (list) {
        return res.status(200).send({
          status: 200,
          message: "Fetch successfully",
          data: list,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: "Record not found",
          data: [],
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listCategory: async (req, res, next) => {
    try {
      let findQuery = {
        where: [],
      };
      if (req.query.search) {
        findQuery.where.push({
          name: { [Op.like]: `%${String(req.query.search).trim()}%` },
        });
      }
      let list = await models.categories.findAll(findQuery);
      if (list) {
        return res.status(200).send({
          status: 200,
          message: "Fetch successfully",
          data: list,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: "Record not found",
          data: [],
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },
// test API



//

  listStoreProduct: async (req, res, next) => {
    try {
      let findQuery = {
        where: { shop_id: req.params.id },
      };
      // if (search) {
      //     findQuery.where.push({ name: { [Op.like]: '%' + search + '%' } });
      // }
      let list = await models.products.findAll(findQuery);
      if (!list) {
        return res.status(200).send({
          status: 200,
          messsage: "No record",
          data: [],
        });
      } else if (list) {
        return res.status(200).send({
          status: 200,
          message: "fetch successfull",
          data: {
            list: list,
          },
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listMarket: async (req, res, next) => {
    try {
      let findQuery = {
        // where: { shop_id: req.params.id },
      };
      // if (search) {
      //     findQuery.where.push({ name: { [Op.like]: '%' + search + '%' } });
      // }
      let list = await models.markets.findAll(findQuery);
      if (!list) {
        return res.status(200).send({
          status: 200,
          messsage: "No record",
          data: [],
        });
      } else if (list) {
        return res.status(200).send({
          status: 200,
          message: "fetch successfull",
          data: {
            list: list,
          },
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listStore: async (req, res, next) => {
    try {
      let findQuery = {
        where:{ market_id: req.query.id},
        // include: [
        //   {
        //     model: models.shop_category,
        //     as: "categories",
        //   },
        // ],
      };
      // if (search) {
      //     findQuery.where.push({ name: { [Op.like]: '%' + search + '%' } });
      // }
      let list = await models.shops.findAll(findQuery);
      if (!list) {
        return res.status(200).send({
          status: 200,
          messsage: "No record",
          data: [],
        });
      } else if (list) {
        return res.status(200).send({
          status: 200,
          message: "fetch successfull",
          data: {
            list: list,
          },
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  // App consumer

  
  listShopCategory: async (req, res, next) => {
    try {
      let findQuery = {
        where: { shop_id:  req.params.id},
        include:{
          model: models.categories,
          as:"categories",
          attributes:['id', 'name', 'attachment', 'color' ]
        }
      };
      // if (search) {
      //     findQuery.where.push({ name: { [Op.like]: '%' + search + '%' } });
      // }
      let list = await models.shop_and_categories.findAll(findQuery);
      if (!list) {
        return res.status(200).send({
          status: 200,
          messsage: "No record",
          data: [],
        });
      } else if (list) {
        return res.status(200).send({
          status: 200,
          message: "fetch successfull",
          data: {
            list: list,
          },
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  
// 
storeChoiceProduct: async (req, res, next) => {
  try {
    let findQuery = {
      where: {
        [Op.and]: [
          { shop_id: req.query.id },
          {storeChoice: '1'}
        ],
      }
    };
    // if (search) {
    //     findQuery.where.push({ name: { [Op.like]: '%' + search + '%' } });
    // }
    let list = await models.products.findAndCountAll(findQuery);
    if (!list) {
      return res.status(200).send({
        status: 200,
        messsage: "No record",
        data: [],
      });
    } else if (list) {
      return res.status(200).send({
        status: 200,
        message: "fetch successfull",
        data: {
          list: list,
        },
      });
    }
  } catch (error) {
    sendResponse.error(error);
  }
},




};
