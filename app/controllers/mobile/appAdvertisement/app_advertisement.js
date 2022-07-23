const { Op, Sequelize } = require("sequelize");
const db = require("../../../../database/sequelize/sequelize");
const models = require("../../../../database/sequelize/sequelize");
const sendResponse = require("../../../utility/functon/sendResponse");

/********************** App Advertisement ************************************* */
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  addAppAdvertisement: async (req, res, next) => {
    try {
      let banner;
      let image = req.files.attachement;
      let bodyData = { ...req.body };
      await cloudinary.uploader
        .upload(image.tempFilePath, { folder: "" })
        .then(async (result) => {
          bodyData.attachement = result.url;
          if (result.url) {
            banner = await models.app_advertisement.create(bodyData);
          }
          if (banner) {
            return res.status(200).json({
              status: 200,
              message: "banner created successfully",
              data: banner,
            });
          } else {
            return res.status(400).json({
              status: 400,
              message: "Unable to create banner",
              data: null,
            });
          }
        });
    } catch (error) {
      sendResponse.error(error);
    }
  },

  fetchAppAdvertisement: async (req, res, next) => {
    try {
      let banner;
      let findQuery = {
        where: [],
      };
      
      if(req.query.filter ){
        findQuery.where.push({ banner_type: req.query.filter, status: '1' })
      } else {
        findQuery.where.push({  status: '1' })
      }
      banner = await models.app_advertisement.findAll(findQuery);
      if (banner) {
        return res.status(200).json({
          status: 200,
          message: "Fetch successfully",
          data: banner,
        });
      } else if(!banner) {
        return res.status(202).json({
          status: 202,
          message: "No Content",
          data: null,
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },
  updateStatus: async (req, res, next) => {
    try {
      let banner;
      let findQuery = {
        where: { id: req.params.id },
      };
      [banner] = await models.app_advertisement.update( { status :'1' }, findQuery);
      if (banner) {
        return res.status(200).json({
          status: 200,
          message: "updated successfully",
          data: banner,
        });
      } else if(!banner) {
        return res.status(202).json({
          status: 202,
          message: "Unable to update.",
          data: null,
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },
};
