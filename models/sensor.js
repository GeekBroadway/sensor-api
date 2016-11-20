const mongoose = require('mongoose');
const uuid = require('node-uuid');
//config
const config = require('../config/config.js');
//Model Setup
const Schema = mongoose.Schema;

let SensorSchema = new Schema({
    _id: {type: String, default: uuid.v4, unique: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    desc: {type: String, required: true},
    hub: {type: String, required: true},
});


module.exports = mongoose.model('Sensor', SensorSchema);