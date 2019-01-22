const Logger = require('../helpers/logger');
const ErrorHelper = require('../helpers/errorHelper');
const redisClient = require('../helpers/redis.connect');

/** store a string */
exports.storeAString = async (req, res) => {
    Logger.info('API called to store a string');

    let { key, value } = req.body;

    try {
        let result = await redisClient.setAsync(key,value)
        if (result) {
            res.status(200).json({'message':result});
            Logger.info('String stored successfully');
        }
    } catch (err) {
        ErrorHelper.sendError(res, 500, 'Unknown Server Error', 'Unknown server error while stroing string');
    }
};

/** Get a string */
exports.getAString = async (req, res) => {
    Logger.info('API called to store a string');

    let { key } = req.query;

    try {
        let exist = await redisClient.existsAsync(key);
        if(exist){
            let result = await redisClient.getAsync(key);
            if (result) {
                res.status(200).json(
                    {
                        'key': key,
                        'value':result
                    });
                Logger.info('String returned successfully');
            }
        }else{
            ErrorHelper.sendError(res, 404, 'Not found', 'No such key exists');
        }
    } catch (err) {
        ErrorHelper.sendError(res, 500, 'Unknown Server Error', 'Unknown server error while getting string');
    }
};