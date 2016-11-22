
# Routes (Not Complete)
- **Error Response**
    
    **(500 Internal Server Error)** Error occured processing request, 
    this can occur under any route
    ```json
    {
      "status": false,
      "message": "Something Broke!",
      "errors": null
    }
    ```
- **GET** /api
    - URL Params: null
    - Data Params: null
    - Success Response: **(200 OK)**
       ```json
       {
          "name": "Sensor API", 
          "version": 0.1.0
       }
       ```
- **POST** /api/sensor/add
    - URL Params: null
    - Data Params: 
        ```json
        {
        	"name": "Sensor 1",
        	"type": "Temp & Humidity",
        	"desc": "Living Room Sensor",
        	"hub": "b43cc6cd-d5da-4ad2-8e53-d3b8aa1ddf2e"
        }
        ```
    - Success Response: **(200 OK)**
        ```json
            {
                "status": true,
                "message": "sensor added",
                "sensorId": "fcb6913d-b00b-4a5c-96f0-78a1a1be6854"
            }
        ```
    - Error Response:
        **(400 Bad Request)** caused by not supplying all parameters
        ```json
        {
          "status": false,
          "message": "Val Errors",
          "errors": [
            {
              "param": "name",
              "msg": "Invalid sensorId"
            }
          ]
        }
        ```
    - Notes: *The value returned in sensorId after a successful response should
    be used in future requests*
       
- **DELETE** /api/sensor/by/:UUID
- **GET** /api/sensor/by/:UUID

- **POST** /api/data/record
- **GET** /api/data/retrieve/:UUID
	   
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