const logger = require("../../utility/logs/fileLogger");
const constantEn = require("../../utility/locals/constant_en");
const constantAr = require("../../utility/locals/constant_ar");
/*******************************************************/

/**
 * @param {Number} code
 * @param {Object} data
 * @param {String} message
 * @param {Object} req
 * @param {Object} res
 * @public
 */
const success = (code, data, message, req, res) =>
{
    // changes by usman because of language screen before login
    let responseMessage;
    if(req.headers.lang === "en" )
    {
        responseMessage = constantEn(message)
    } 
    else if(req.headers.lang === "ar" )
    {
        responseMessage = constantAr(message)
    } 
    else
    {
        responseMessage = req.lang === "en" ? constantEn(message) : constantAr(message);
    }

    const response = {
        status: code,
        message: responseMessage,
        data: data
    };
    logger.info(req, response);
    return res.status(code).json(response);
};
/**
 * @param {Number} code
 * @param {Object} data
 * @param {String} message
 * @param {Object} req
 * @param {Object} res
 * @public
 */
const warn = (code, data, message, req, res) =>
{
    //const responseMessage = req.lang === "en" ? constantEn(message) : constantAr(message);
    let responseMessage;
    if(req.headers.lang === "en" )
    {
        responseMessage = constantEn(message)
    } 
    else if(req.headers.lang === "ar" )
    {
        responseMessage = constantAr(message)
    } 
    else
    {
        responseMessage = req.lang === "en" ? constantEn(message) : constantAr(message);
    }
    const response = {
        status: code,
        message: responseMessage,
        data: data
    };
    logger.warn(req, response);
    return res.status(code).json(response);
};

/**
 * @param {Object || String} err
 * @param {Function} next
 * @param {Object} res
 * @public
 */
const error = (err, next, res) =>
{
    const response = {
        status: 500,
        message: constantEn("SERVER_ERROR"),
        data: err
    };
    if (res)
    {
        return res.status(500).json(response);
    }
    else if (next)
    {
        return next(response);
    }
    else
    {
        console.log("error", error);
        console.log("next || res objects are arguments are missing");
    }
};

/**
 * @param {Object} data
 * @param {Object} req
 * @param {Object} res
 * @public
 */
const dbError = (data, req, res) =>
{
    const response = {
        status: 422,
        message: "failed to communicate with database",
        data: data
    };
    logger.error(req, response);
    return res.status(422).json(response);
};

/**
 * @param {Number} code
 * @param {Object} data
 * @param {String} message
 * @param {Object} req
 * @param {Object} res
 * @public
 */
const conflict = (code, data, message, req, res) =>
{
    const responseMessage = req.lang === "en" ? constantEn(message) : constantAr(message);

    const response = {
        status: code,
        message: responseMessage,
        data: data
    };
    return res.status(code).json(response);
};
/*******************************************************/
module.exports = {
    success,
    warn,
    error,
    dbError,
    conflict
};
