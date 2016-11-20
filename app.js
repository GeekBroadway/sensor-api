//NPM Packages
let express = require("express");
let https = require("https");
let morgan = require('morgan');
let fs = require('fs');
let mongoose = require('mongoose');
//App Components
let config = require('./config/config.js');
let logger = require('./utils/logger.js');
let app = express();
let router = express.Router();
//mongoose setup
if(process.env.NODE_ENV == 'test') {
    logger.startup("Running in TEST mode");
    mongoose.connect(config.mongo.testurl);
    mongoose.connection.on('error', function (err) {
        logger.error("Error occurred connected to mongo: " + err.message);
    });
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
//External Routes
let data = require('./routes/data.js');
let sensor = require('./routes/sensor.js');
//Express
app.use('/api', router);
router.use(morgan('combined', { 'stream': logger.stream}));
//Timeout
router.use(function(req, res, next) {
    res.setTimeout(config.server.timeout, function() {
        res.status(408).json({
            success: false,
            message: "Request Timed Out! an error likely occurred"
        });
    });
    next();
});
//Routes
router.use('/data', data);
router.use('/sensor', sensor);
//Hardcoded Routes
router.get('/', function(req,res) {
    res.status('200').json({
        name: 'SensorAPI Root',
        version: '0.1.0'
    });
});
app.get('/', function(req, res){
    res.status('200').json({
        message: 'API is at /api'
    });
});
//Errors and Timeouts
app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).json({status: 'Something broke!'});
    next();
});
//Server Startup
startServer();
function startServer() {
    https.createServer({
        key: fs.readFileSync(config.server.sslKeyPath),
        cert: fs.readFileSync(config.server.sslCertPath)
    }, app).listen(config.server.port, function () {
        logger.startup("Ready to go on: " + config.server.port)
    });
}
