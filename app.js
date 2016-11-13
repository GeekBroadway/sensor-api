//NPM Packages
var express = require("express");
var https = require("https");
var morgan = require('morgan');
var winston = require('winston');
var fs = require('fs');
//App Components
var config = require('./config/config.js');
var logger = require('./utils/logger.js');
var app = express();
var router = express.Router();
//Express
app.use('/api', router);
router.use(morgan('combined', { 'stream': logger.stream}));
startServer();
function startServer() {
    https.createServer({
        key: fs.readFileSync(config.server.sslKeyPath),
        cert: fs.readFileSync(config.server.sslCertPath)
    }, app).listen(config.server.port, function () {
        console.log("Ready to go on: " + config.server.port)
    });
}
