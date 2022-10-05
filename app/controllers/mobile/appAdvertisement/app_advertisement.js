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
