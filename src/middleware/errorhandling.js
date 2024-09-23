const httpStatus = require('http-status');
const logger = require('../config/logger'); 

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

 
    res.locals.errorMessage = err.message;


    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };


    logger().error(err); 
    if (process.env.NODE_ENV === 'development') {
        logger().error(err);
    }

    res.status(statusCode).send(response);

};

module.exports = errorHandler;
