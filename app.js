//NPM Packages
var express = require("express");
var https = require("https");
var morgan = require('morgan');
var winston = require('winston');
var fs = require('fs');
var mongoose = require('mongoose');
//App Components
var config = require('./config/config.js');
var logger = require('./utils/logger.js');
var app = express();
var router = express.Router();
//mongoose setup
mongoose.connect(config.mongo.url);
//External Routes
var data = require('./routes/data.js');
var sensor = require('./routes/sensor.js');
//Express
app.use('/api', router);
router.use(morgan('combined', { 'stream': logger.stream}));
//Timeout
router.use(function(req, res, next) {
    res.setTimeout(config.server.timeout, function() {
        res.status(408).json({
            success: false,
            message: "Request Timed Out! an error likely occured"
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
