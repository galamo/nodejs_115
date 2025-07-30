import winston from "winston"

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston.format.json()),
    transports: [
        //
        // - Write all logs with importance level of `error` or higher to `error.log`
        //   (i.e., error, fatal, but not other levels)
        //
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        //
        // - Write all logs with importance level of `info` or higher to `combined.log`
        //   (i.e., fatal, error, warn, and info, but not trace)
        //
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/info.log', level: 'debug' }),
    ],
});



export default logger;