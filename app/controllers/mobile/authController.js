const models = require('../../../database/sequelize/sequelize');
var jwt = require('jsonwebtoken');
const sendResponse = require('../../utility/functon/sendResponse');
const User = require('../../../database/schemas/user');

module.exports = {

    signUp: async (req, res, next) => {

        try {
            let bodyData = {...req.body};
            let user ;
           
            let findQuery = {
                where: {
                    email : bodyData.email
                }
            }
              user = await models.users.findOne(findQuery);
             if(user){
                 return res.status(400).send({
                     status: 400,
                     message: `User already exists with this email ${email} address`
                 })
             }  
             if(bodyData.userType === 'user'){
                 bodyData.role_id = 3
             } 
             if(bodyData.userType === 'reseller'){
                bodyData.role_id = 2
             }
            user = new models.users(bodyData);
           
            user.generatePassword(bodyData.password);
            let isSave = await user.save();
            if (isSave) {
                return res.status(200).send({
                    status: 200,
                    message: 'User Created successfully',
                    data: isSave
                });
            } else {
                return res.status(400).send({
                    status: 400,
                    message: 'DB Error'
                });
            }
        } catch (error) {
            res.status(404).send({
                code: 404,
                message: 'error',
                error
            });
        }
    },

    login: async (req, res, next) => {
        try {
            let { password, email } = req.body;
            let findQuery = {
                where: { email: email }
            }
            let user = await models.users.findOne(findQuery);
            if (!user || !user.validatePassword(password, user.password)) {
                return res.status(401).send({
                    status: 401,
                    message: "Invalid Credential"
                });
            } else if (user && user.validatePassword(password, user.password)) {

                let token = jwt.sign({
                    id: user.id
                }, 'secret',
               {
                expiresIn: "100d"
               }
                );

                let authKey = await models.auth_key.findOne({ where: { user_id: user.id } });
                if (!authKey) {
                    let AuthKey = new models.auth_key({});
                    AuthKey.auth_key = token;
                    AuthKey.user_id = user.id
                    await AuthKey.save(AuthKey);
                } else if (authKey) {
                    authKey.auth_key = token
                    await authKey.save();
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Db Error",
                    });
                }
                return res.status(200).json({
                    status: 200,
                    message: "Login success",
                    token: token,
                    user: user
                });
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "DB error"
                });
            }
        } catch (error) {
            sendResponse.error(error);
        }

    },
    listUser: async function (req, res, next) {
        try {
            let list;
            let findQuery = {
            };
            list = await models.users.findAll({});
            if (!list) {
                return res.status(200).send({
                    status: 200,
                    message: 'No record found !'
                });
            }
            return res.status(200).json({
                status: 200,
                message: 'Fetch Successfully',
                data: {
                    list: list
                },

            })
        } catch (error) {
            sendResponse.error(error)
        }
    },
    authenticateUser: async function (req, res, next) {
        try {
            let user;
            console.log('logind id ==>', req.userId);
            let findQuery = {
                where : { user_id: req.userId }
            };
            user = await models.users.findOne({
                where: {id: req.userId  },
                attributes:['id', 'email','username','role']
            });
            if (!user) {
                return res.status(200).send({
                    status: 200,
                    message: `No record found`
                });
            } else if(user){
                let auth_key = await models.auth_key.findOne(findQuery);
                if(auth_key){
                    return res.status(200).json({
                        status: 200,
                        message: 'success',
                        data: {
                            user: user,
                            authorization: auth_key.auth_key
                        }
        
                    });                  
                }
            }

        } catch (error) {
            sendResponse.error(error)
        }
    },
}
