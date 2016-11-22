process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app.js');
const should = chai.should();
chai.use(chaiHttp);

let UUID;
let falseUUID = 'c5233e47-604a-435d-bf92-c2fd61defb85';
let currentDate = new Date().getTime();
let futureDate = (new Date(currentDate+(60*60000))).getTime();

before(function(done){
    addSensor(function(uuid){
        UUID = uuid;
        done();
    })
});

describe('POST /api/data/record', function() {
    it('should return successful when parsed correct info in JSON string form', function (done) {
        chai.request(server)
            .post('/api/data/record')
            .send({
                "sensorId": UUID,
                "sensorData": "{\"temp\": 100, \"hum\": 200}"
            }).end(function (err, res) {
                res.status.should.equal(200);
                res.body.should.have.all.keys("status", "message");
                res.body.status.should.be.true;
                done();
        });
    });
    it('should return successful when parsed correct info in JSON object form', function (done) {
        chai.request(server)
            .post('/api/data/record')
            .send({
                "sensorId": UUID,
                "sensorData": {
                    "temp": 100,
                    "hum": 200
                }
            }).end(function (err, res) {
                res.status.should.equal(200);
                res.body.should.have.all.keys("status", "message");
                res.body.status.should.be.true;
                done();
        });
    });
    it('should return successful when parsed correct info in URL Encoded form', function (done) {
        chai.request(server)
            .post('/api/data/record')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                "sensorId": UUID,
                "sensorData": "{\"temp\": 100, \"hum\": 200}"
            }).end(function (err, res) {
                res.status.should.equal(200);
                res.body.should.have.all.keys("status", "message");
                res.body.status.should.be.true;
                done();
        });
    });
    it('should return false when not given a sensorId', function (done) {
        chai.request(server)
            .post('/api/data/record')
            .send({
                "sensorData": {
                    "temp": 100,
                    "hum": 200
                }
            }).end(function (err, res) {
                res.status.should.equal(400);
                res.body.should.have.all.keys("status", "message", "errors");
                res.body.errors[0].should.have.all.keys("param", "msg");
                res.body.status.should.be.false;
                done();
        });
    });
    it('should return false when not given sensorData', function (done) {
        chai.request(server)
            .post('/api/data/record')
            .send({
                "sensorId": UUID
            }).end(function (err, res) {
                res.status.should.equal(400);
                res.body.should.have.all.keys("status", "message", "errors");
                res.body.errors[0].should.have.all.keys("param", "msg");
                res.body.status.should.be.false;
                done();
        });
    });
    it('should return false when not given sensorId & sensorData', function (done) {
        chai.request(server)
            .post('/api/data/record')
            .send({
            }).end(function (err, res) {
                res.status.should.equal(400);
                res.body.should.have.all.keys("status", "message", "errors");
                res.body.errors[0].should.have.all.keys("param", "msg");
                res.body.errors[1].should.have.all.keys("param", "msg");
                res.body.status.should.be.false;
                done();
        });
    });
    it('should return false when given a sensorId that does not exist', function(done){
        chai.request(server)
            .post('/api/data/record')
            .send({
                "sensorId": falseUUID,
                "sensorData": {
                    "temp": 100,
                    "hum": 200
                }
            }).end(function (err, res) {
                res.status.should.equal(400);
                res.body.should.have.all.keys("status", "message","errors");
                res.body.status.should.be.false;
                done();
        });
    });
    it('should error given malformed JSON', function(done){
        chai.request(server)
            .post('/api/data/record')
            .send({
                "sensorId": falseUUID,
                "sensorData": "{\"temp\": 100\"hum\": 200}"
            }).end(function (err, res) {
            res.status.should.equal(400);
            res.body.should.have.all.keys("status", "message","errors");
            res.body.status.should.be.false;
            done();
        });
    });
});
describe('GET /api/data/retrieve/UUID', function(){
    it('should return true given just a UUID', function(done){
       chai.request(server)
           .get('/api/data/retrieve/'+UUID)
           .end(function (err, res) {
               res.status.should.equal(200);
               res.body.should.have.all.keys("status", "message","data");
               res.body.status.should.be.true;
               done();
       });
    });
    it('should return true given a UUID and Date', function(done){
       chai.request(server)
           .get('/api/data/retrieve/'+UUID+'?afterDate='+currentDate)
           .end(function (err, res) {
               res.status.should.equal(200);
               res.body.should.have.all.keys("status", "message","data");
               res.body.status.should.be.true;
               done();
           });
    });
    it('should return empty and true for a future date', function(done){
       chai.request(server)
           .get('/api/data/retrieve/'+UUID+'?afterDate='+futureDate)
           .end(function (err, res) {
               res.status.should.equal(200);
               res.body.should.have.all.keys("status", "message","data");
               res.body.status.should.be.true;
               res.body.data.should.deep.equal([]);
               done();
           });
    });
    it('should return not found not given a UUID', function(done){
       chai.request(server)
           .get('/api/data/retrieve/')
           .end(function (err, res) {
               res.status.should.equal(404);
               done();
           });
    });
    it('should error given an incorrect UUID', function(done){
        chai.request(server)
            .get('/api/data/retrieve/'+UUID+'1')
            .end(function (err, res) {
                res.status.should.equal(400);
                done();
            });
    });
});
function addSensor(callback) {
    chai.request(server)
        .post('/api/sensor/add')
        .send({
            "name": "Sensor 1",
            "type": "Temp & Humidity",
            "desc": "Living Room Sensor",
            "hub": "HUBID"
        }).end(function (err, res) {
        callback(res.body.sensorId);
    });
}