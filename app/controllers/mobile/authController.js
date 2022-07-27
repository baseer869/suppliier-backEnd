const models = require('../../../database/sequelize/sequelize');
var jwt = require('jsonwebtoken');
const sendResponse = require('../../utility/functon/sendResponse');
const User = require('../../../database/schemas/user');

module.exports = {

    // signUp: async (req, res, next) => {

    //     try {
    //         let {  email } = req.body;
    //         let findQuery = {
    //             where: { email: email }
    //         }
           
           
    //         let  [user, error] = await models.users.findOne(findQuery);
    //         console.log('error', user)
    //          if(user){
    //              return res.status(400).json({
    //                  status: 400,
    //                  message: `User already exists with this email ${email} address`,
    //                  user
    //              })
    //          }  
    //         //  if(bodyData.userType === 'user'){
    //         //      bodyData.role_id = 3
    //         //  } 
    //         //  if(bodyData.userType === 'reseller'){
    //         //     bodyData.role_id = 2
    //         //  }
    //         // user = new models.users(bodyData);
           
    //         // user.generatePassword(bodyData.password);
    //         // let isSave = await user.save();
    //         // if (isSave) {
    //         //     return res.status(200).send({
    //         //         status: 200,
    //         //         message: 'User Created successfully',
    //         //         data: isSave
    //         //     });
    //         // } else {
    //         //     return res.status(400).send({
    //         //         status: 400,
    //         //         message: 'DB Error'
    //         //     });
    //         // }
    //     } catch (error) {
    //         return res.status(404).send({
    //             status: 404,
    //             message: "DB error",
    //             error
    //         });      
    //       }
    // },
    signUp: async (req, res, next) => {
        try {
            let { password, email } = req.body;
            let findQuery = {
                where: { email: email }
            }
            let user = await models.users.findOne(findQuery);
            if(user){
                return res.status(202).json({
                    status: 202,
                    message:"Email Already Exist !!",
                    data : null
                })
            }
               if(req.body.userType === 'user'){
                req.body.role_id = 3
             } 
             if(req.body.userType === 'reseller'){
                req.body.role_id = 2
             }
            user = new models.users(req.body);
           
            user.generatePassword(req.body.password);
            let userCreated = await user.save();
            if (userCreated) {
                return res.status(200).send({
                    status: 200,
                    message: 'User Created successfully',
                    data: userCreated
                });
            } else {
                return res.status(400).send({
                    status: 400,
                    message: 'DB Error'
                });
            }

        } catch (error) {
            sendResponse.error(error);
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
