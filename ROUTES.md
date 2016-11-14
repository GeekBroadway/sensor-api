
# Routes (Not Complete)
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