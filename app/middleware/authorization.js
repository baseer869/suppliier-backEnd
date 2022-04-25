const { Op } = require("sequelize");
const sendResponse = require("../utility/functon/sendResponse");
const model = require("../../database/sequelize/sequelize");

module.exports = function () {
    return async function (req, res, next) {
        try {
            let findQuery = {
                where: {  [Op.and]: [
                    { id: req.userId },
                    { role: '2' }
                  ]}
            }
            let data = await model.users.findOne(findQuery);
            if (data) {
                next();
            } else {
                return res.status(401).json({
                    status: 401,
                    message: "role authorization failed !"
                })
            }
        } catch (error) {
            sendResponse.error(error);
        }
    }
}