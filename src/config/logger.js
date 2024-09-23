
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
       
    ],
});


logger.error = (message) => {
    logger.log({ level: 'error', message });
};

module.exports = logger;
