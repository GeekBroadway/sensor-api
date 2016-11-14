
# Routes (Not Complete)
* **/API/** - Public Accessible API, is used by application interfaces such as iOS, Android and Web Access but is also for public use.
   * **POST /API/data/** - Append a data point
       * **Arguments**
            * **apiKey=[Hash]** - API Key
            * **sensorId=[UUIDv4]** - Sensor ID
            * **value=[Float/Integer/Boolean]** - Sensor Value
	   * **Returns**
	        * **status=[Boolean]**
   * **POST /API/sensor/add** - Add a sensor to the configuration
       * **Arguments**
            * **sensorName=[String]** - Sensor Name
	        * **sensorType=[Int]** - Sensor Type
	   * **Returns**
	        * **status=[Boolean]**
	        * **sensorId=[UUIDv4]**
   * **POST /API/sensor/remove** - Remove a sensor from the configuration
       * **Arguments**
            * **sensorId=[String]** - Sensor Name
	   * **Returns**
	        * **status=[Boolean]**
	   
	   
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