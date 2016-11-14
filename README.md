# Sensor API
---
## What is it?
**Sensor API is a service to connects single or multiple server devices (Raspberry Pi, Arduino, Others) to multiple clients or users through either:**
* An API (Making API Calls)
* An iOS or Android App
* A web interface

## Function
* Servers make POSTs periodically to the API Server using an API Key
* Each client application makes requests to the server to get the latest data and displays it nicely
* Each client can access this data either by login or by a QA Key (Quick Authentication Key), Example:
   * #452-ASK
   * #324-SDF
* This QA Key makes it easy to quickly access the data per user, it is individual to the user, but shorter than a API Key.

## Features
* Used by those with an abundance of sensors throughout a location
* More effective than lots of wires, could be used with Arduino Mini's
* Easy interface and centralisation
* Could charge for premium access or some other addition to function

# Logistics (Not Complete)
* **/API/** - Public Accessible API, is used by application interfaces such as iOS, Android and Web Access but is also for public use.
   * **POST /API/data/** - Append a data point (Returns Success/Error)
       * **apikey=[Hash]** - API Key
	   * **sensorid=[Integer]** - Sensor ID
	   * **value=[Float/Integer/Boolean]** - Sensor Value
   * **POST /API/sensor/add** - Add a sensor to the configuration (Returns Success/Error)
       * **sensorname=[String]** - Sensor Name
	   * **sensortype=[Int]** - Sensor Type
   * **POST /API/sensor/remove** - Remove a sensor from the configuration (Returns Success/Error)
       * **sensorid=[Int]** - Sensor Name
	   
	   
* **/Auth/** - Private API For User Authentication, Issuing API Keys and registration functions.
   * **POST /auth/register** - Registration
       * **email**
	   * **first_name**
	   * **last_name**
	   * **password**
   * **GET /auth/login** - Login
       * **email**
	   * **password**
   * **GET /auth/generate-keys** - Registration
       * **email**
	   * **password**