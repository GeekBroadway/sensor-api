# Sensor API - Backend
The API Backend for Sensor API
---
## What is it?
Sensor API is a service to connects single or multiple server devices (Raspberry Pi, Arduino, Others) to multiple clients or users through either:
* This API (Making API Calls)
* An iOS or Android App
* A web interface

## Sensor Types
* Temperature
* Humidity
* Binary/Boolean States
* Light (Lumens)

## Function
* Servers make POSTs periodically to the API Server using an API Key
* Each Server uses API interfaces (per language)
* Each client application makes requests to the server to get the latest data and displays it nicely
* Each client can access this data either by loggin in or by a QA Key (Quick Authentication Key) EG: #452-ASK or #324-SDF
* This QA Key makes it easy to quickly access the data per user, it is individual to the user, but shorter than a API Key.

## Features
* Used by those with an abundance of sensors throughout a location
* More effective than lots of wires
* Easy interface and centralisation
* Could charge for premium access or some other addition to function

## POST/GET Locations
* POST /api/data/ - Append a data point
* GET /api/data/ - Fetch Data
   * sensorid = n - Sensor ID Number
   * timecode = n - Timecode (unix)
   * A. apikey = # - API Key
   * B. qakey = # - Quick Authentication Key
* GET /api/stats/ - Returns JSON of users statistics
   * apikey = # - API Key
* GET /api/apistats/ - Retruns JSON of API's statistics
   * apikey = # - API Key
* POST /api/auth/ - returns session key
