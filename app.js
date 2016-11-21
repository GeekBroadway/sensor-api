//NPM Packages
const express = require("express");
const https = require("https");
const morgan = require('morgan');
const fs = require('fs');
//App Components
const config = require('./config/config.js');
const logger = require('./utils/logger.js');
let app = express();
let router = express.Router();
//mongoose setup
const mongoCon = require('./utils/mongoose.js');
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
            status: false,
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
/* istanbul ignore else */
if(process.env.NODE_ENV === 'test'){
    router.get('/test/timeout', function(req,res){
       //Don't send a response
    });
    router.get('/test/error', function(req,res){
       throw new Error("This is an error test");
    });
}
//Errors and Timeouts
app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).json({status: false, message: 'Something broke!', errors: null});
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

module.exports = app;