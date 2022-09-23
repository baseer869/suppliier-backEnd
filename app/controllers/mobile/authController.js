const models = require('../../../database/sequelize/sequelize');
var jwt = require('jsonwebtoken');
const sendResponse = require('../../utility/functon/sendResponse');
const User = require('../../../database/schemas/user');
const { Op } = require('sequelize');
const database = require("../../utility/calls/databaseRequest");
const config = require("../../../db");

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
    signup: async (req, res, next) => {
		try {
			if (req.body.user_type == "reseller") {
				req.body.role_id = "1";
			} else if (req.body.user_type == "user") {
				req.body.role_id = "2";
			}else {
				return res.status(400).json({
					status: 400,
					message: `Invalid user_type `,
					data: null,
				});
			}
			let where = {
				  [Op.and]: [{ role_id: req.body.role_id }, { email: req.body.email }]
			};
			let isUser = await database.findOne(models.users, where);
			if (isUser) {
				return res.status(400).json({
					status: 400,
					message: `Account already exist Against ${req.body.email}`,
					data: null,
				});
			} else 
			if (!isUser) {
				//--//
				// let phone = String(+((req.body.phone)))
				// if (!phone || phone.length < 12 || phone.length > 12) {
				// 	return res.status(400).json({
				// 		status: 400,
				// 		message: `Invalid phone`,
				// 		data: null,
				// 	});
				// }
				//--//
				let User = new models.users(req.body);
				
				User.generatePassword(User.password);
				let code = Math.floor(Math.random() * (9999 - 1000) + 1000);
				User.verify_code = code;
				// if (req.body.device_token) { User.device_token = req.body.device_token }
				// if (req.body.device_type) { User.device_type = req.body.device_type }
				// if (req.headers.lang) {
				// 	User.lang = req.headers.lang;
				// }

				let result = await database.save(User);

				if (result) {
					let token = jwt.sign({ id: result.email }, "secretString", {
						expiresIn: 86400, // 24 hours
					});
					whereForAuthKey = {
						user_id: result.id,
					};
					let authkey = await database.findOne(models.authKey, whereForAuthKey);
					if (!authkey) {
						let Authkey = new models.authKey({});
						Authkey.user_id = parseInt(result.id);
						Authkey.auth_key = token;
						
						let result1 = await database.save(Authkey);
					} else if (authkey) {
						authkey.auth_key = token;
						let result = await database.save(authkey);
					}
					// if (result.role_id == 1 || result.role_id == 3) {
					// 	let instance = new models.artist_info({});
					// 	instance.user_id = result.id;
					// 	instance.stageName = result.name;
					// 	instance.officialEmail = result.email;
					// 	instance.contactPhone = phone
					// 	instance.otherPhone = phone
					// 	instance.city_id = result.city_id;
					// 	instance.city = result.city;
					// 	instance.biography = '';
					// 	await database.save(instance);
					// } else if (result.role_id == 1) {
					// 	nodeMailer.dispatchEmail("User Created", 'asadbaig.andpercent@gmail.com',
					// 		`New User Signup for ArtStation
					// name: ${result.name},
					// email: ${result.email},
					// phone: ${result.phone},
					// city: ${result.city}`)
					// }
					// result.phone = String(result.phone)
					// result.role_id = parseInt(result.role_id)
					return res.status(200).json({
						status: 200,
						message: `Account Created`,
						data: {
							auth_token: token,
							user: result,
						},
					});
				}
			}
		} catch (error) {
			console.log(error);
			sendResponse.error(error, next, res);
		}
	},
     login: async (req, res, next) => {
    try {
      console.log('Here')
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({
          status: 400,
          message: `email & password`,
          data: {},
        });
      }
      let where = {
        email: req.body.email,
        // role_id: req.body.role_id,
      };
      let user = await database.findOne(models.users, where);
      if (!user || !user.validatePassword(req.body.password, user.password)) {
        const response = {
          status: 401,
          message: "Invalid Credientials",
          data: {
            auth_token: "",
            user: {},
          },
        };
        return res.status(401).json(response);
      } else if (user.status == "1" || user.status == "2") {
        let token = jwt.sign({ id: user.phone }, "secretString", {
          expiresIn: 86400, // 24 hours
        });
        whereForAuthKey = {
          user_id: user.id,
        };
        let authkey = await database.findOne(models.authKey, whereForAuthKey);
        if (!authkey) {
          let Authkey = new models.authKey({});
          Authkey.user_id = parseInt(user.id);
          Authkey.auth_key = token;
          let result = await database.save(Authkey);
        } else if (authkey) {
          authkey.auth_key = token;
          let result = await database.save(authkey);
        }
        // if (req.body.device_token) { user.device_token = req.body.device_token }
        // if (req.body.device_type) { user.device_type = req.body.device_type }
        await database.save(user)
        res.status(200).json({
          status: 200,
          message: "Login Successful",
          data: {
            auth_token: token,
            user: user,
          },
        });
      } else if (user.status == "0") {
        const response = {
          status: 401,
          message: "Account not verified",
          data: {
            auth_token: "",
            user: {},
          },
        };
        return res.status(401).json(response);
      } else if (result.code === 422) {
        sendResponse.dbError(result, req, res);
      } else {
        sendResponse.success(
          500,
          result,
          "Failed to communicate with server.",
          req,
          res
        );
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(error, next, res);
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
