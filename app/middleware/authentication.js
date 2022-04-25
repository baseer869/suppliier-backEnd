const model = require("../../database/sequelize/sequelize");
const sendResponse = require("../utility/functon/sendResponse");

module.exports = function () {

    return async function (req, res, next) {
        try {
            let token = req.headers.authorization;
            let findQuery = {
                where: { auth_key: token }
            }

            if (!token || token === "" || token === null) {
                return res.status(400).send({
                    status: 400,
                    message: "Token Auththenication failed!"
                });
            }
            let auth_key = await model.auth_key.findOne(findQuery);
            let { user_id} = auth_key;
            if (auth_key) {
                req.userId = user_id;            
                next();
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Token authentication failed"
                });
            }

        } catch (error) {
            sendResponse.error(error);
        }

    }
}