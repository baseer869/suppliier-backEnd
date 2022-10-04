const { Op } = require("sequelize");
const models = require("../../../database/sequelize/sequelize");
const sendResponse = require("../../utility/functon/sendResponse");
const cloudinary = require("cloudinary").v2;
const database = require("../../utility/calls/databaseRequest");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  addCategory: async (req, res, next) => {
    try {
      let category;
      let image = req.files.attachement
        ? req.files.attachement.tempFilePath
        : "";
      cloudinary.uploader
        .upload(image, { folder: "/uploads" })
        .then(async (result) => {
          req.body.attachement = result.url;
          category = await models.categories.create(req.body);
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
        });
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listCategory: async (req, res, next) => {
    try {
      let list;
      let findQuery = {
        where: {
          status: "1",
        },
      };
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

  //
  addProduct: async (req, res, next) => {
    try {
      let productBody = { ...req.body };
      let images;
      let item;
      var imageUrlList = [];
      for (var i = 0; i < req.files.attachment.length; i++) {
        var locaFilePath = req.files.attachment[i].tempFilePath;
        await cloudinary.uploader
          .upload(locaFilePath, { folder: "" })
          .then(async (result) => {
            console.log("result", result)
            imageUrlList.push(result.url);
          }).catch((error) => {
            console.log("error", error)
            sendResponse.error(error)
          });
      }
      let code = Math.floor(Math.random() * (99999 - 10000) + 10000 + 20000);
      productBody.attachment = null;
      productBody.product_code = `re${code}`
      item = await models.products.create(productBody);
      if (item) {
        // let shippingChargesBody = {
        //   productId: item?.dataValues?.id,
        //   is_shipping_charges: req.body.is_shipping_charges,
        //   charges: parseInt(req.body.charges) 
        // }

        // await models.products_shipping_charges.create(
        //   shippingChargesBody
        // );

        for (let index = 0; index < imageUrlList.length; index++) {
          const element = imageUrlList[index];
          let imagesBody = {
            status: "1",
            images: element,
            productId: item?.dataValues?.id,
          };

          images = await models.product_images.create(imagesBody);
        }
        if (images) {
          return res.status(200).json({
            status: 200,
            message: `Product added successfully`,
            data: {
              item: item,
            },
          });
          //
        } else {
          return res.status(404).send({
            status: 404,
            message: "Unable to add product",
            data: {
              item: null
            },
          });
        }
      } else {
        return res.status(400).send({
          status: 400,
          message: "Db Error",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(error, next, res);
    }
  },
  searchProduct: async (req, res, next) => {
    try {
      let { code } = req.body;
      let product_code = `re${code}`
      if (!req.body.code) {
        return res.status(400).json({
          status: 400,
          message: `Product code is required to buy`,
          data: null
        });
      }
      let where = {
        product_code: product_code.trim(),
      };


      let product = await database.findOne(models.products, where);
      if (product) {
        //--//
        //recenet searches 
        let search = await models.recentSearches.findOne({ where: { product_id: product.dataValues.id } })
        if (!search) {
          let = { deviceId, } = req.body;
          let searchedBody = {
            deviceId: deviceId,
            status: "1",
            product_id: product.dataValues.id,
          }
          await models.recentSearches.create(searchedBody)
        }
        res.status(200).json({
          status: 200,
          message: "Product Found",
          data: {
            product: product
          },
        });
      }
      else if (!product) {
        const response = {
          status: 401,
          message: "Product not found.",
          data: {
            product: null,
          },
        };
        return res.status(401).json(response);
      } else {
        sendResponse.success(
          500,
          result,
          "Failed to communicate with server.",
          req,
          res
        );
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(error, next, res);
    }
  },

  //
  listProduct: async (req, res, next) => {
    try {
      let { search, filterType } = req.query;
      let findQuery = {
        where: [],
        include: [
          {
            model: models.store,
            as: "stores",
            where: [
              {
                status: "1",
              },
            ],
            attributes: ["id", "name"],
          },
          {
            model: models.product_images,
            as: "product_images",
          },
          {
            attributes: ['id', 'charges', 'is_shipping_charges'],
            model: models.products_shipping_charges,
            as: "products_shipping_charges",
          },
        ],
      };
      if (search) {
        findQuery.where.push({ name: { [Op.like]: "%" + search + "%" } });
      }
      if (filterType) {
        findQuery.where.push({
          productType: { [Op.like]: "%" + filterType + "%" },
        });
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
        where: { category_id: req.query.category_id },
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



  //--//

  changeOrderStatus: async (req, res, next) => {
    try {
      let { transactionStatus, id } = req.body
      let order = await models.order.update({ transactionStatus: transactionStatus }, { where: { id: id } })
      if (order) {
        return res.status(200).send({
          status: 200,
          message: "Status Updated",
          data: {
            list: order,
          },
        });
      } else {
        return res.status(404).send({
          status: 404,
          message: "Unable to Update Status",
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

};
