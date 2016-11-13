#!/bin/sh

echo "Creating default configuration Files"
cp ../config/config.def.js ../config/config.js

mkdir ../config/certs/
# HTTPS Certs
if [[ ! -f ../config/certs/https_key.pem || ! -f ../config/certs/https_cert.pem ]]; then
    echo "Generating openssl Certs"
    openssl req -x509 -newkey rsa:2048 -keyout ../config/certs/https_key.pem -out ../config/certs/https_cert.pem -days 365 -nodes -subj '/CN=localhost'
fi
