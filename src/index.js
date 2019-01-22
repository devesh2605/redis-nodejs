const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

require('../src/routes/redis.route')(app);

/**
* Listen to server
*/
app.listen(port, function () {
    console.log('Server is listening on port ', port);
});