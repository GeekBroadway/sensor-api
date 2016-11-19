//modules
const express = require('express');
const bodyParser = require('body-parser');
//Local includes
var config = require('../config/config.js');
var logger = require('../utils/logger.js');
//Setup
const data = express();
data.use(bodyParser.urlencoded({extended: true}));
data.use(bodyParser.json());
//mongoose
var DataPoint = require('../models/data.js');
var Sensor = require('../models/sensor.js');
//Routes
data.post('/record', postSensorDataRecord);
//logic
function postSensorDataRecord(req, res){
    if(!req.body.sensorId || !req.body.sensorData) {
        res.status(400).json({status: false, message: 'Please pass all body Vars'});
    } else {
        var sensorId = req.body.sensorId;
        var sensorData = req.body.sensorData;
        var newData = new DataPoint({
            sensorId: sensorId,
            sensorData: sensorData
        });
        newData.save(function(err){
            if(err) {
                if(err.maccode === "sen_no_exist") {
                    res.status(400).json({status: false, message: "Sensor not in database"})
                } else {
                    res.status(500).json({status: false, message: "an error occured"});
                    logger.error(err);
                }
            } else {
                res.json({status: true, message: "data point added"});
            }
        });
    }
    }
module.exports = data;