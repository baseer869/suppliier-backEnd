require('dotenv').config();
const database = require('../utility/calls/databaseRequest');
/*******************/
// Importing Models
/*******************/
var models = require("../../database/sequelize/sequelize");
/*******************/
//Main Controllers.
/*******************/
/*******************/
module.exports = function(type){
    return async function(req, res, next){
        try{
            const token = req.headers.authorization;
            console.log("token --<", token)
            if(!token || (token === "") || (token === false) || (token === null)){
                next({
                    status: 401,
                    message: "Token authentication failed"
                });
            }else if(token){
                let where = {
                    auth_key: token
                };
                // let data;
                if(type === 'cms'){
                    let data = await database.findOne(models.authKey, where);
                    if(Object.keys(data).length > 0){
                        data || data != null
                    // if(data || data != null){
                        req.adminId = data.admin_id;
                        req.lang = data.lang;
                        req.role = 1;
                        next();
                    }
                    else{
                        next({
                            status: 401,
                            message: "Token authentication failed"
                        });
                    }
                }
                else if(type === 'mobile'){
                    data = await database.findOne(models.authKey, where);
                    // if(Object.keys(data).length > 0){
                    if(data){
                        // console.log(data);
                        req.userId = data.user_id;
                        req.deviceId = data.device_id;
                        req.device_type = data.device_type;
                        req.token = data.token;
                        req.lang = data.lang;
                        next();
                    }
                    else{
                        next({
                            status: 401,
                            message: "Token authentication failed"
                        });
                    }
                }
            }
        }
        catch(error){
            let error_name = error.name;
            next({
                status: 401,
                message: "Authentication failed due to " + error_name
            });
        }
    };
};