module.exports = function (app) {

    const Redis = require('../controllers/redis.controller');

    /**Store a string */
    app.post('/api/string/store',Redis.storeAString);

    /**Get a string */
    app.get('/api/string/get',Redis.getAString);
}