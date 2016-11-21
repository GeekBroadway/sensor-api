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
let Data = require('../models/data.js');
//Routes
sensor.post('/add', postAddSensor);
sensor.get('/by/:UUID', getByUUID);
sensor.delete('/by/:UUID', deleteByUUID);
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
            return;
        } else {
            res.json({status: true, message: "sensor added", sensorId: newSensor._id});
        }
    });
}
function getByUUID(req, res){
    req.checkParams('UUID', 'Invalid sensorID').notEmpty().isUUID();

    let errors = req.validationErrors();
    if(errors) {
        res.status(400).json({status: false, message: 'Val Errors', errors: errors});
        return;
    }
    let sensorId = req.params.UUID;

    Sensor.findOne({_id: sensorId}).then(function(sensor){
        if(sensor !== null) {
            let dataObject = {sensorId: sensorId, name: sensor.name, type: sensor.type, desc: sensor.desc, hub: sensor.hub};
            res.json({status: true, message: "sensor data retrieved", data: dataObject});
        } else {
            res.status(400).json({status: false, message: "Sensor not in database", errors: null})
        }
    }).catch(function(err){
        if(err){
            res.status(500).json({status: false, message: 'DB Error Occurred', errors: null});
            logger.error(err.message);
        }
    });
}
function deleteByUUID(req,res){
    req.checkParams('UUID', 'Invalid sensorID').notEmpty().isUUID();

    let errors = req.validationErrors();
    if(errors) {
        res.status(400).json({status: false, message: 'Val Errors', errors: errors});
        return;
    }
    let sensorId = req.params.UUID;

    Sensor.findOne({_id: sensorId}).remove().then(function(removed){
        if(removed.result.n === 0){
            res.status(400).json({status: false, message: "Sensor not in database", errors: null});
            return;
        }
        if(removed.result.n == 1){
            deleteData();
        }
    }).catch(function(err){
        if(err) {
            res.status(500).json({status: false, message: "DB Error Occurred", errors: null});
            logger.error(err.message);
        }
    });
    function deleteData() {
        Data.find({sensorId: sensorId}).remove().then(function(removed){
            res.status(200).json({status: true, message: "Sensor Deleted", dataDeleted: removed.result.n})
        }).catch(function(err){
            if(err) {
                res.status(500).json({status: false, message: "DB Error Occured", errors: null})
                logger.error(err.message);
            }
        });
    }
}
module.exports = sensor;