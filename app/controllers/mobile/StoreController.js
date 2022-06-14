const { Op, Sequelize } = require("sequelize");
const models = require("../../../database/sequelize/sequelize");
const sendResponse = require("../../utility/functon/sendResponse");

module.exports = {
  createStoreCategory: async (req, res, next) => {
    try {
      let categoryDetail = { ...req.body };
      let setResponse;
      let category_created = new models.store_categories(categoryDetail);
      let created =  await category_created.save();
    
    if (created) {
        setResponse = {
          status: 200,
          message: "category created successfully",
          data: created,
        };
        return res.status(200).json(setResponse);
      } else if (!created) {
        setResponse = {
          status: 400,
          message: "DB ERROR !, TRY AGAIN",
          data: null,
        };
        return res.status(400).json(setResponse);
    }
    } catch (error) {
      sendResponse.error(error);
    }
  },

listStoreCategory: async (req, res, next) => {
    try {
      let category;
      let findQuery = {
          where:{ status: "1" }
      };
      category = await models.store_categories.findAll(findQuery);
      if (category) {
        return res.status(200).json({
          status: 200,
          message: "list fetch successfully",
          data: category,
        });
      } else if(!category) {
        return res.status(402).json({
          status: 402,
          message: "Category not found",
          data: null,
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },



  //**************************************   CREATE SHOP **********************/  




  createStore: async (req, res, next) => {
    try {
      let storeDetail = { ...req.body };
      let setResponse;
      let store_created = new models.store(storeDetail);
      console.log("store_created", storeDetail)

      let created =  await store_created.save();
      console.log("created", created)
    if (created) {
        setResponse = {
          status: 200,
          message: "store created successfully",
          data: created,
        };
        return res.status(200).json(setResponse);
      } else if (!created) {
        setResponse = {
          status: 400,
          message: "DB ERROR !, TRY AGAIN",
          data: null,
        };
        return res.status(400).json(setResponse);
    }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  //

  listStore: async (req, res, next) => {
    try {
      let store;
      let findQuery = {
          where:{ status: "1" },
      };
      store = await models.store.findAll(findQuery);
      if (store) {
        return res.status(200).json({
          status: 200,
          message: "list fetch successfully",
          data: store,
        });
      } else if(!category) {
        return res.status(402).json({
          status: 402,
          message: "Store not found",
          data: null,
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },




};
