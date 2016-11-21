process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app.js');
const should = chai.should();
chai.use(chaiHttp);

describe('POST /api/sensor/add', function(){
   it('should create a sensor given correct fields', function(done){
       chai.request(server)
           .post('/api/sensor/add')
           .send({
               "name": "Sensor 1",
               "type": "Temp & Humidity",
               "desc": "Living Room Sensor",
               "hub": "HUBID"
           }).end(function(err, res){
                res.status.should.equal(200);
                res.body.status.should.be.true;
                res.body.should.have.all.keys('status','message','sensorId');
                done();
       });
   });
   it('should error given not given name', function(done){
       chai.request(server)
           .post('/api/sensor/add')
           .send({
               "type": "Temp & Humidity",
               "desc": "Living Room Sensor",
               "hub": "HUBID"
           }).end(function(err, res){
           res.status.should.equal(400);
           res.body.status.should.be.false;
           res.body.should.have.all.keys('status','message','errors');
           res.body.errors[0].should.have.all.keys('param','msg');
           done();
       });
   });
   it('should error given not given type', function(done){
       chai.request(server)
           .post('/api/sensor/add')
           .send({
               "name": "Sensor 1",
               "desc": "Living Room Sensor",
               "hub": "HUBID"
           }).end(function(err, res){
           res.status.should.equal(400);
           res.body.status.should.be.false;
           res.body.should.have.all.keys('status','message','errors');
           res.body.errors[0].should.have.all.keys('param','msg');
           done();
       });
   });
   it('should error given not given desc', function(done){
       chai.request(server)
           .post('/api/sensor/add')
           .send({
               "name": "Sensor 1",
               "type": "Temp & Humidity",
               "hub": "HUBID"
           }).end(function(err, res){
           res.status.should.equal(400);
           res.body.status.should.be.false;
           res.body.should.have.all.keys('status','message','errors');
           res.body.errors[0].should.have.all.keys('param','msg');
           done();
       });
   });
   it('should error given not given hub', function(done){
       chai.request(server)
           .post('/api/sensor/add')
           .send({
               "name": "Sensor 1",
               "type": "Temp & Humidity",
               "desc": "Living Room Sensor"
           }).end(function(err, res){
           res.status.should.equal(400);
           res.body.status.should.be.false;
           res.body.should.have.all.keys('status','message','errors');
           res.body.errors[0].should.have.all.keys('param','msg');
           done();
       });
   });
   it('should error properly not given multiple fields', function(done){
        chai.request(server)
            .post('/api/sensor/add')
            .send({
                "type": "Temp & Humidity",
                "desc": "Living Room Sensor"
            }).end(function(err, res){
            res.status.should.equal(400);
            res.body.status.should.be.false;
            res.body.should.have.all.keys('status','message','errors');
            res.body.errors[0].should.have.all.keys('param','msg');
            res.body.errors[1].should.have.all.keys('param','msg');
            done();
        });
    });
});