//modules
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//Local includes
let config = require('../config/config.js');
let logger = require('../utils/logger.js');
//Setup
const sensor = express();
sensor.use(bodyParser.json());
sensor.use(expressValidator());
//mongoose
let Sensor = require('../models/sensor.js');
//Routes
sensor.post('/add', postAddSensor);
//Logic
function postAddSensor(req, res){
    req.checkBody('name', 'Invalid sensorId').notEmpty();
    req.checkBody('type', 'Invalid sensorData').notEmpty();
    req.checkBody('desc', 'Invalid sensorData').notEmpty();
    req.checkBody('hub', 'Invalid sensorData').notEmpty();

    let errors = req.validationErrors();
    if(errors) {
        res.status(400).json({status: false, message: 'Val Errors', errors: errors});
        return;
    }

    let senName = req.body.name,
        senType = req.body.type,
        senDesc = req.body.desc,
        senHub = req.body.hub;

    let newSensor = new Sensor({
       name: senName,
       type: senType,
       desc: senDesc,
       hub: senHub,
       data: []
    });
    newSensor.save(function(err){
        if(err) {
            res.status(500).json({status: false, message: "DB Error occurred", errors: null});
            logger.error(err);
        } else {
            res.json({status: true, message: "sensor added", sensorId: newSensor._id});
        }
    });
}
module.exports = sensor;