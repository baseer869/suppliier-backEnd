/*******************************************************/
// Importing Files.
/*******************************************************/
let constantEn = require("../../utility/locals/constant_en");

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const winston = require('winston');
require('winston-daily-rotate-file');
require('dotenv').config();

/*******************************************************/
// Decaring Variables.
/*******************************************************/
let logger, options

/*******************************************************/
// Configring Winstom Logger.
/*******************************************************/
options = {
    "fileInfo": {
        frequency: "24h",
        filename: 'logs/info/%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '10m',
        level: "info"
    },
    "fileWarn": {
        frequency: "24h",
        filename: 'logs/warn/%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '10m',
        level: "warn"
    },
    "fileError": {
        frequency: "24h",
        filename: 'logs/error/%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '10m',
        level: "error"
    },
    "console": {
        level: 'info',
        handleExceptions: true,
        json: true,
        prettyPrint: true,
        colorize: true,
    },
}
if (process.env.ENV === "development") {

    logger = winston.createLogger({
        format: winston.format.json(),
        transports: [
            new(winston.transports.DailyRotateFile)(options.fileInfo),
            new(winston.transports.DailyRotateFile)(options.fileWarn),
            new(winston.transports.DailyRotateFile)(options.fileError),
            // new winston.transports.Console(options.console),
            new winston.transports.Console(
                //     {
                //     format: winston.format.combine(
                //         winston.format.colorize(),
                //         winston.format.simple(),

                //     )
                // }
                {
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.timestamp(),
                        winston.format.align(),
                        winston.format.printf((info) => {
                            const {
                                timestamp,
                                level,
                                message,
                                ...args
                            } = info;

                            const ts = timestamp.slice(0, 19).replace('T', ' ');
                            return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
                        }),
                    )
                }
            )
        ]
    });
} else {
    logger = winston.createLogger({
        format: winston.format.json(),
        transports: [
            new(winston.transports.DailyRotateFile)(options.fileInfo),
            new(winston.transports.DailyRotateFile)(options.fileWarn),
            new(winston.transports.DailyRotateFile)(options.fileError)
        ]
    });
}

/*******************************************************/
// Implementing Helper/Common  Functions.
/*******************************************************/
let today, timeStamp, loggerDetails

/*******************************************************/
// Implementing Helper/Common  Functions.
/*******************************************************/
const info = (req, res) => {
    today = new Date();
    timeStamp = String(today);
    loggerDetails = {
        dateAndTime: timeStamp,
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        req: req.body,
        res: res,
    }
    logger.info(JSON.stringify(loggerDetails));
}

const warn = (req, res) => {
    today = new Date();
    timeStamp = String(today);
    loggerDetails = {
        dateAndTime: timeStamp,
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        req: req.body,
        res: res,
    }
    logger.warn(JSON.stringify(loggerDetails));
}

const error = (req, res) => {
    today = new Date();
    timeStamp = String(today);
    loggerDetails = {
        dateAndTime: timeStamp,
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        req: req.body,
        res: res,
    }
    logger.error(JSON.stringify(loggerDetails));
}

const consoleInfo = (data) => {
    logger.info(JSON.stringify(data));
}

const consoleWarn = (data) => {
    logger.warn(JSON.stringify(data));
}

const consoleError = (data) => {
    logger.error(JSON.stringify(data));
}

/*******************************************************/
// Exporting Functions.
/*******************************************************/
module.exports = {
    info,
    warn,
    error,
    consoleInfo,
    consoleWarn,
    consoleError
}