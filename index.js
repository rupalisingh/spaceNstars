const app = require("./app");
const logger = require("./src/config/logger"); 
const dotenv = require('dotenv').config();

let server;
const port = process.env.PORT || 8080;


server = app.listen(port, () => {
    logger.info(`Listening on Port ${port}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed.');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};


const unexpectedErrorHandler = (error) => {
    logger.error(error); 
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler); 

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
