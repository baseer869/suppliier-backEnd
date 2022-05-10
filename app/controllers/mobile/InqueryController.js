const { Op, Sequelize } = require("sequelize");
const models = require("../../../database/sequelize/sequelize");
const sendResponse = require("../../utility/functon/sendResponse");

module.exports = {
  postInquery: async (req, res, next) => {
    try {
        req.body.userId = req.userId;
      let Inquery = new models.Inquery(req.body);
      let item = await Inquery.save();
      if (item) {
        return res.status(200).send({
          status: 200,
          message: "Inquery sent successfully",
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

  listInquery: async (req, res, next) => {
    try {
        let findQuery ={

        }
      let Inquery = await models.Inquery.findAll(findQuery);
      if (Inquery) {
        return res.status(200).send({
          status: 200,
          message: "fetched successfully",
          data: Inquery,
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


};
