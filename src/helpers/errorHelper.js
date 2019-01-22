const Logger = require('./logger');

const sendError = (res, status, type, message) => {
    res.status(status).json(
        {
            'type': type,
            'message': message
        });
    Logger.error(message);
}

module.exports={
    sendError
}