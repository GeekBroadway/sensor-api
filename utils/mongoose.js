const mongoose = require('mongoose');
const logger = require('./logger.js');
const config = require('../config/config.js');

//Mongoose Setup
mongoose.Promise = global.Promise;
/* istanbul ignore else */
if(process.env.NODE_ENV == 'test') {
    mongoose.connect(config.mongo.testurl);
    mongoose.connection.once('connected', () => {
        mongoose.connection.db.dropCollection('datas', function(err, result){});
        mongoose.connection.db.dropCollection('sensors', function(err, result){});
    });
} else {
    mongoose.connect(config.mongo.url);
    mongoose.connection.on('error', function (err) {
        logger.error("Error occurred connected to mongo: " + err.message);
    });
}
module.exports = mongoose.connection;
