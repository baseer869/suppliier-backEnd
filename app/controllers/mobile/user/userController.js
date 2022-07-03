const models = require("../../../../database/sequelize/sequelize");
var jwt = require("jsonwebtoken");
const sendResponse = require("../../../utility/functon/sendResponse");
const User = require("../../../../database/schemas/user");

module.exports = {
  fetchUserAddress: async (req, res, next) => {
    try {
      //    let {  } = body;
      let findQuery = {
        where: {
          id: req.userId,
          default: true,
        },
        attributes: [
          "id",
          "email",
          "addressTitle",
          "username",
          "customerName",
          "city",
          "state",
          "address",
          "zip",
          "phone",
          "default",
        ],
      };

      let userAddress = await models.users.findOne(findQuery);
      if (!userAddress) {
        res.status(202).json({
          status: 202,
          message: "Address not found",
          data: null,
        });
      }
      res.status(200).json({
        status: 200,
        message: `Fetch successfully.`,
        data: userAddress,
      });
    } catch (error) {
      sendResponse.error(error);
    }
  },

  //

  updateUserAddress: async (req, res, next) => {
    try {
      let bodyRequest = req.body;
      bodyRequest.default = true;
      let findQuery = {
        where: {
          id: req.userId,
        },
      };
      if (req.body.username) {
        bodyRequest.username = req.body.username;
      }
      let [addressUpdated] = await models.users.update(bodyRequest, findQuery);
      if (!addressUpdated) {
        res.status(404).json({
          status: 404,
          message: "Failed to update address",
          data: null,
        });
      }
      res.status(200).json({
        status: 200,
        message: `Updated successfully.`,
        data: addressUpdated,
      });
    } catch (error) {
      sendResponse.error(error);
    }
  },
};
