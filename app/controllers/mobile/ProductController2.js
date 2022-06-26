const { Op } = require("sequelize");
const models = require("../../../database/sequelize/sequelize");
const sendResponse = require("../../utility/functon/sendResponse");
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();



cloudinary.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET
})

module.exports = {
  
  addCategory: async (req, res, next) => {
    try {
      let category;
      let  image = req.files.attachement ? req.files.attachement.tempFilePath : "" 
       cloudinary.uploader.upload(image, { folder :'/uploads' }).then( async (result)=>{
        req.body.attachement = result.url
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
       
      })
     
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listCategory: async (req, res, next) => {
    try {
      let list;
      let findQuery = {
        where :{
          status : '1'

        }
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

  addProduct: async (req, res, next) => {
    try {
      let productBody = {...req.body};
      // let  image = req.files.attachment ? req.files.attachment.tempFilePath : "" 
      // cloudinary.uploader.upload(image, { folder :'/uploads' }).then(async (result)=>{

      //   productBody.attachment = result.url
      //    console.log("result========", result);

      // })
      console.log('product is save=======', productBody)

      let product = new models.products(productBody);

      let item = await product.save();
       console.log('item is save=======', item)
       
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
