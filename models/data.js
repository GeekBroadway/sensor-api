const mongoose = require('mongoose');
const uuid = require('node-uuid');
//config
const config = require('../config/config.js');
//Model Setup
const Sensor = require('./sensor');
const Schema = mongoose.Schema;

let DataSchema = new Schema({
    recorded_at: {type: String, required: true, default: Date.now},
    sensorId: {type: String, required: true},
    sensorData: {type: Schema.Types.Mixed, required: true}
});
DataSchema.pre("save", function(next){
    let datapoint = this;
    Sensor.count({_id: datapoint.sensorId}, function(err, count){
        if (err) return next(err);
        if(count === 0){
            let error = new Error("Sensor doesnt exist in db")
            error.maccode = "sen_no_exist";
            return next(error);
        } else {
            return next();
        }
    })
});
module.exports = mongoose.model('Data', DataSchema);