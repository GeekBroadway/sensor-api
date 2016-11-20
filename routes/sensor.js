//modules
const express = require('express');
const bodyParser = require('body-parser');
//Local includes
let config = require('../config/config.js');
let logger = require('../utils/logger.js');
//Setup
const sensor = express();
sensor.use(bodyParser.urlencoded({extended: true}));
sensor.use(bodyParser.json());
//mongoose
let Sensor = require('../models/sensor.js');
//Routes
sensor.post('/add', postAddSensor);
//Logic
function postAddSensor(req, res){
    if(!req.body.name || !req.body.type || !req.body.desc || !req.body.hub) {
        res.status(400).json({status: false, message: 'Please pass all body lets'});
    } else {
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
                res.status(500).json({status: false, message: "an error occurred"});
                logger.error(err);
            } else {
                res.json({status: true, message: "sensor added", sensorId: newSensor._id});
            }
        });
    }
}
module.exports = sensor;