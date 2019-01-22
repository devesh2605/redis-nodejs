const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            json: false,
            timestamp: true,
            colorize: true,
        })
    ],
    exitOnError: false
});

module.exports = logger;