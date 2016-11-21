process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app.js');
const config = require('../config/config.js');
const should = chai.should();
chai.use(chaiHttp);

describe("GET /", function(){
   it("should return a message stating API location", function(done){
       chai.request(server)
           .get('/')
           .end(function (err, res) {
               res.status.should.equal(200);
               res.body.should.have.all.keys("message");
               done();
       });
   })
});
describe("GET /api", function(){
    it("should return a message stating name and version", function(done){
        chai.request(server)
            .get('/api')
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.should.have.all.keys("name", "version");
                done();
            });
    })
});
describe("Timeouts", function(){
    it("should return an error after exceeding the timeout", function(done){
        this.timeout(100+config.server.timeout);
        chai.request(server)
            .get('/api/test/timeout')
            .end(function (err, res) {
                res.status.should.equal(408);
                res.body.should.have.all.keys("status", "message");
                done();
            });
    });
});
describe("Error Handling", function(){
    it("should return a proper error message and status", function(done){
        chai.request(server)
            .get('/api/test/error')
            .end(function (err, res) {
                res.status.should.equal(500);
                res.body.should.have.all.keys("status", "message","errors");
                done();
            });
    });
});