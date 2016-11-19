var config = {};

config.filesystem = {};
config.filesystem.root = "/home/vagrant/sensor_backend/"; //Include the trailing slash

config.server = {};
config.server.port = '8000';
config.server.timeout = 5000;
config.server.sslCertPath = config.filesystem.root+'config/certs/https_cert.pem';
config.server.sslKeyPath = config.filesystem.root+'config/certs/https_key.pem';

config.mongo = {};
config.mongo.url = "mongodb://localhost/sensorapi";

module.exports = config;