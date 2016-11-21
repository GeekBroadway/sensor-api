process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app.js');
const should = chai.should();
chai.use(chaiHttp);

let UUID;
let falseUUID = 'c5233e47-604a-435d-bf92-c2fd61defb85';

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
                UUID = res.body.sensorId;
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
describe('GET /api/sensor/by/UUID', function(){
    it('should return true when given a valid UUID', function(done){
       chai.request(server)
           .get('/api/sensor/by/'+UUID)
           .end(function(err, res){
               res.status.should.equal(200);
               res.body.status.should.be.true;
               res.body.should.have.all.keys('status','message','data');
               res.body.data.should.have.all.keys('sensorId','name','type','desc','hub');
               done();
       });
    });
    it('should return not found when given no UUID', function(done){
        chai.request(server)
            .get('/api/sensor/by')
            .end(function(err, res){
                res.status.should.equal(404);
                done();
            });
    });
    it('should error given an invalid UUID', function(done){
        chai.request(server)
            .get('/api/sensor/by/'+UUID+'1')
            .end(function(err, res){
                res.status.should.equal(400);
                res.body.status.should.be.false;
                res.body.should.have.all.keys('status','message','errors');
                res.body.errors[0].should.have.all.keys('param','msg','value');
                done();
            });
    });
    it('should error when given a UUID that doesnt exist', function(done){
        chai.request(server)
            .get('/api/sensor/by/'+falseUUID)
            .end(function(err, res){
                res.status.should.equal(400);
                res.body.should.have.all.keys('status','message','errors');
                done();
            });
    });
});
describe('DELETE /api/sensor/by/UUID', function(){
    it('should return true when given a valid UUID', function(done){
        chai.request(server)
            .delete('/api/sensor/by/'+UUID)
            .end(function(err, res){
                res.status.should.equal(200);
                res.body.status.should.be.true;
                res.body.should.have.all.keys('status','message','dataDeleted');
                done();
            });
    });
    it('should return not found when given no UUID', function(done){
        chai.request(server)
            .delete('/api/sensor/by/')
            .end(function(err, res){
                res.status.should.equal(404);
                done();
            });
    });
    it('should error given an invalid UUID', function(done){
        chai.request(server)
            .delete('/api/sensor/by/'+UUID+'1')
            .end(function(err, res){
                res.status.should.equal(400);
                res.body.status.should.be.false;
                res.body.should.have.all.keys('status','message','errors');
                res.body.errors[0].should.have.all.keys('param','msg','value');
                done();
            });
    });
    it('should error when given a UUID that doesnt exist', function(done){
        chai.request(server)
            .delete('/api/sensor/by/'+UUID)
            .end(function(err, res){
                res.status.should.equal(400);
                res.body.should.have.all.keys('status','message','errors');
                done();
            });
    });
});