const bluebird = require('bluebird');
const redis = require('redis');
const Logger = require('../helpers/logger');

const redisClient = redis.createClient();
bluebird.promisifyAll(redis);

let reconnectCount = 0;

redisClient.on("error", function (err) {
    Logger.error("There was an error with redis ", err);
});
redisClient.on('ready',function() {
    Logger.info("Redis is ready");
});

redisClient.on('connect',function(){
    Logger.info('Connected to redis');
    reconnectCount = 0;
});

redisClient.on('reconnecting',function(err){
    Logger.warn('Redis is reconnecting');
    reconnectCount++;
    if(reconnectCount >= 10) {
        redisClient.quit();
    }
});
module.exports = redisClient;