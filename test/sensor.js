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
                done();
       });
   });
});