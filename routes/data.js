//modules
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//Local includes
var config = require('../config/config.js');
var logger = require('../utils/logger.js');
//Setup
const data = express();
data.use(bodyParser.urlencoded({extended: true}));
data.use(bodyParser.json());
data.use(expressValidator());
//mongoose
var Data = require('../models/data.js');
var Sensor = require('../models/sensor.js');
//Routes
data.post('/record', postSensorDataRecord);
data.get('/retrieve/:UUID', getSensorDataByUUID);
//logic
function postSensorDataRecord(req, res){
    req.checkBody('sensorId', 'Invalid sensorId').notEmpty().isUUID();
    req.checkBody('sensorData', 'Invalid sensorData').notEmpty();

    var errors = req.validationErrors();
    if(errors) {
        res.status(500).json({status: false, message: 'Val Errors', errors: errors});
        return;
    }
    var sensorId = req.body.sensorId;
    try {
        var sensorData = JSON.parse(req.body.sensorData);
    } catch (e) {
        res.status(400).json({status: false, message: "Malformed data, make sure is JSON"});
        logger.error(e.message);
        return;
    }

    var newData = new Data({
        sensorId: sensorId,
        sensorData: sensorData
    });
    newData.save(function(err){
        if(err) {
            if(err.maccode === "sen_no_exist") {
                res.status(400).json({status: false, message: "Sensor not in database"})
                return;
            } else {
                res.status(500).json({status: false, message: "an error occurred"});
                logger.error(err);
                return;
            }
        }
        res.json({status: true, message: "data point added"});
    });
}
function getSensorDataByUUID(req, res){
    req.checkParams('UUID', 'Invalid sensorID').notEmpty().isUUID();
    req.checkQuery('afterDate', 'Invalid date').isDate();

    var errors = req.validationErrors();
    if(errors) {
        res.status(500).json({status: false, message: 'Val Errors', errors: errors});
        return;
    }
    sensorId = req.params.UUID;
    var dataPoints = [];
    if(!req.query.afterDate) {
        Data.find({sensorId: sensorId}).sort({'recorded_at': -1}).limit(config.mongo.limit).then(function(result){
            for (var i = 0, len = result.length; i < len; i++) {
                dataPoints.push({time: result[i].recorded_at, data: result[i].sensorData});
                logger.debug(result[i].sensorData.temp)
            }
            res.json(dataPoints);
        }).catch(function(err){
            res.status(500).json({status: false, message: err.message})
        });
    } else {
        var afterDate = new Date(req.query.afterDate);
        var currentDate = new Date;
        Data.find({sensorId: sensorId, recorded_at: {$gt: afterDate, $lt: currentDate}}).sort({'recorded_at': -1}).limit(config.mongo.limit).then(function (result) {
            for (var i = 0, len = result.length; i < len; i++) {
                dataPoints.push({time: result[i].recorded_at, data: result[i].sensorData});
                logger.debug(result[i].sensorData.temp)
            }
            res.json(dataPoints);
        }).catch(function (err) {
            res.status(500).json({status: false, message: err.message})
        });
    }
}
module.exports = data;