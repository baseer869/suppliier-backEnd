const { Op } = require("sequelize");
const models = require("../../../database/sequelize/sequelize");
const sendResponse = require("../../utility/functon/sendResponse");

module.exports = {
  addCategory: async (req, res, next) => {
    try {
      let category;
      // let findQuery = {
      //     where: { user_id: req.body.user_id },
      // };
      // category = await models.categories.findOne(findQuery);
      // if (category) {
      //     return res.status(400).json({
      //         status: 400,
      //         message: "category Already exist on this request",
      //         data: []
      //     });
      // } else
      // if (!category && category === null) {
      req.body.attachement =
        "http://localhost:3000/uploads/" + req.file.filename;
      console.log(req.body);
      category = await models.categories.create(req.body);
      console.log("category===", category);

      if (category) {
        return res.status(200).json({
          status: 200,
          message: "category created successfully",
          data: category,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Unable to create category",
          data: [],
        });
      }
      // }
      // else {
      //     return res.status(400).json({
      //         status: 400,
      //         message: "Db Eror",
      //         data: []
      //     });
      // }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listCategory: async (req, res, next) => {
    try {
      let list;
      let findQuery = {};
      list = await models.categories.findAll(findQuery);
      if (list) {
        return res.status(200).json({
          status: 200,
          message: "list fetch successfully",
          data: list,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Unable to create shop",
          data: [],
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  addProduct: async (req, res, next) => {
    try {
      let productBody = {...req.body};
      let product = new models.products(productBody);

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
        include:[ {
          model: models.store,
          as :"stores",
          where:[{
            status :'1'
          } ],
          attributes :['id', 'name',]

        }]
      };
      if (search) {
          findQuery.where.push({ name: { [Op.like]: '%' + search + '%' } });
      }
      let list = await models.products.findAll(findQuery);
      if (!list) {
        return res.status(202).send({
          status: 202,
          messsage: "No record",
          data: null,
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

  productDetail: async (req, res, next) => {
    try {
      let findQuery = {
        where: { id: req.params.id },
      };
      let list = await models.products.findOne(findQuery);
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
  categoryProduct: async (req, res, next) => {
    try {
      let findQuery = {
        where: { category_id: req.query.category_id  },
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
